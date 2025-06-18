import { SorobanRpc, TransactionBuilder, xdr, StrKey, Contract } from 'stellar-sdk';
import freighterApi from "@stellar/freighter-api";

const RPC_URL = 'https://soroban-testnet.stellar.org:443';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

type TxStatus = "PENDING" | "SUCCESS" | "FAILED" | "NOT_FOUND";

export async function handleTipTransaction(
  publicKey: string,
  contractId: string,
  tipAmount: number,
  callbacks: {
    setMessage: (msg: string) => void;
    setError: (err: string) => void;
    setTxHash: (hash: string) => void;
  }
) {
  const { setMessage, setError, setTxHash } = callbacks;

  if (!publicKey) {
    setError("Lütfen önce cüzdanınızı bağlayın.");
    return;
  }

  setMessage("İşlem hazırlanıyor...");
  setError("");
  setTxHash("");

  try {
    const rpc = new SorobanRpc.Server(RPC_URL, { allowHttp: true });
    const sourceAccount = await rpc.getAccount(publicKey);
    const contract = new Contract(contractId);

    const tipperAddress = xdr.ScVal.scvAddress(
      xdr.ScAddress.scAddressTypeAccount(
        xdr.PublicKey.publicKeyTypeEd25519(
          StrKey.decodeEd25519PublicKey(publicKey)
        )
      )
    );

    const stroops = Math.floor(tipAmount * 10_000_000);
    const amountVal = xdr.ScVal.scvI128(
      new xdr.Int128Parts({ hi: xdr.Int64.fromString("0"), lo: xdr.Int64.fromString(stroops.toString()) })
    );

    const op = contract.call('tip', tipperAddress, amountVal);

    const tx = new TransactionBuilder(sourceAccount, {
      fee: '100000',
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(op)
      .setTimeout(30)
      .build();

    setMessage("Lütfen işlemi cüzdanınızda onaylayın...");

    const signedXDR = await freighterApi.signTransaction(tx.toXDR(), { network: 'TESTNET' });
    setMessage("İşlem ağa gönderiliyor...");

    const signedTx = TransactionBuilder.fromXDR(signedXDR, NETWORK_PASSPHRASE);
    const sendTxResponse = await rpc.sendTransaction(signedTx);

    setMessage("İşlem onayı bekleniyor...");

    // Burada tip belirtiyoruz
    type TxResponse = {
      status: TxStatus;
      resultXdr?: string;
    };

    let txResponse = await rpc.getTransaction(sendTxResponse.hash) as TxResponse;

    const startTime = Date.now();
    while (txResponse.status === "PENDING" && (Date.now() - startTime) < 30000) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      txResponse = await rpc.getTransaction(sendTxResponse.hash) as TxResponse;
    }

    if (txResponse.status === "SUCCESS") {
      setMessage("Bahşiş başarıyla gönderildi!");
      setTxHash(sendTxResponse.hash);
    } else {
      let errorDetail = `İşlem başarısız oldu. Durum: ${txResponse.status}`;

      if (txResponse.status === "FAILED" && txResponse.resultXdr) {
        const result = xdr.TransactionResult.fromXDR(txResponse.resultXdr, 'base64');
        const failReason = result.result().results()?.[0]?.tr()?.invokeHostFunctionResult()?.switch().name;
        errorDetail = `İşlem başarısız oldu: ${failReason}`;
      } else if (txResponse.status === "NOT_FOUND") {
        errorDetail = "İşlem bulunamadı. Ağda kaybolmuş olabilir.";
      }

      throw new Error(errorDetail);
    }

  } catch (e: any) {
    console.error(e);
    setError(e.message || "Bilinmeyen bir hata oluştu.");
  }
}
