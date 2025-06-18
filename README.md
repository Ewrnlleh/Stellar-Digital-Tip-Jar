📦 Stellar-Soroban Digital Tip Jar DApp
This project is a digital tip jar / micro-payment DApp built using Stellar and Soroban. It allows content creators, developers, or artists to receive low-cost, instant donations.

🚀 Features
Next.js based modern frontend

Rust / Soroban smart contract

🔑 Freighter wallet integration

⚡ Pre-defined tipping options (1, 5, 10 XLM)

🎨 Sleek and intuitive user interface built with Tailwind CSS

💨 Nearly zero transaction fees and 3-5 second confirmations thanks to the Stellar network

📂 Project Structure
/contracts      # Rust/Soroban smart contract code
/app            # Next.js application code
/components     # React components
/lib            # Helper functions (Soroban interaction)
/tailwind.config.ts # Tailwind configuration
/README.md      # This document!

🛠️ Installation and Deployment
1️⃣ Clone the Repo:
git clone [https://github.com/](https://github.com/)<username>/<repo_name>.git
cd <repo_name>

2️⃣ Install Frontend Dependencies:
npm install

3️⃣ Compile and Deploy the Smart Contract:
Navigate to the contracts directory to deploy the smart contract to the Stellar Testnet.

cd contracts/tip-jar
soroban contract build

Next, deploy the contract. Update the benefactor and network parameters with your own wallet address:

soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/tip_jar.wasm \
  --source <Your_Wallet_Name> \
  --network testnet

This command will give you a Contract ID starting with C.... Save this ID for the next step.

4️⃣ Start the Development Server:
npm run dev

⚙️ Usage
Update the Contract ID: After deploying the smart contract, paste the Contract ID you received into the CONTRACT_ID variable in the components/TipJar.tsx file.

Connect Your Wallet: Connect your Freighter wallet using the button on the main page.

Send a Tip: Select a tip amount and click the "Send" button to approve the transaction in your wallet.

Every tip is recorded as a transaction on the Stellar network!

📸 Screenshots
You can add your application screenshots here.

📄 License
This project is licensed under the MIT License.

✨ How to Contribute:
We welcome your Pull Requests (PRs)!

You can open issues for new feature suggestions and bug reports.

🔗 Useful Links:
🌐 Stellar Developer Docs

🔧 Soroban Documentation

💼 Freighter Wallet

Note: Before running the project, make sure you have compiled and deployed the smart contract in the contracts folder and updated the CONTRACT_ID in the frontend!