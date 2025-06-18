# 📦 Stellar-Soroban Digital Tip Jar DApp

This project is a **digital tip jar / micro-payment DApp** built using **Stellar** and **Soroban**. It allows content creators, developers, or artists to receive low-cost, instant donations.

---

## 🚀 Features

- 🧱 **Next.js based modern frontend**
- 🛠️ **Rust / Soroban smart contract**
- 🔑 **Freighter wallet integration**
- 💸 **Pre-defined tipping options** (1, 5, 10 XLM)
- 🎨 **Sleek and intuitive UI** built with Tailwind CSS
- ⚡ **Fast, cheap transactions** (3-5s confirmations & near-zero fees via Stellar)

---

## 📂 Project Structure

```
/contracts          # Rust/Soroban smart contract code  
/app                # Next.js frontend application  
/components         # Reusable React components  
/lib                # Helper functions (Soroban interaction)
/tailwind.config.ts # Tailwind CSS configuration  
/README.md          # Project documentation  
```

---

## 🛠️ Installation and Deployment

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<username>/<repo_name>.git
cd <repo_name>
```

### 2️⃣ Install Frontend Dependencies
```bash
npm install
```

### 3️⃣ Compile and Deploy the Smart Contract
Navigate to the contract directory:
```bash
cd contracts/tip-jar
soroban contract build
```

Deploy to Stellar Testnet (replace placeholders with your actual values):
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/tip_jar.wasm \
  --source <Your_Wallet_Name> \
  --network testnet
```

✅ After deployment, **save the Contract ID** (starts with `C...`).

---

### 4️⃣ Start the Development Server
Go back to the root and run:
```bash
npm run dev
```

---

## ⚙️ Usage

1. **Update Contract ID:**  
   Replace the `CONTRACT_ID` in `components/TipJar.tsx` with your deployed Contract ID.

2. **Connect Wallet:**  
   Use the "Connect Wallet" button to connect your Freighter wallet.

3. **Send a Tip:**  
   Choose a tip amount and click **Send**. Confirm the transaction in your Freighter wallet.

💡 All tips are recorded on the Stellar blockchain.

---

## 📸 Screenshots

_Add your app screenshots here!_

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ How to Contribute

We welcome contributions!

- Open issues for bugs or feature suggestions.
- Submit Pull Requests (PRs) with improvements or fixes.

---

## 🔗 Useful Links

- 🌐 [Stellar Developer Docs](https://developers.stellar.org/)
- 🧱 [Soroban Documentation](https://soroban.stellar.org/docs)
- 💼 [Freighter Wallet](https://www.freighter.app/)

---

> **Note:** Before using the app, make sure the contract is compiled & deployed, and the `CONTRACT_ID` is updated in the frontend.