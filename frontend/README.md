📦 Stellar-Soroban Digital Tip Jar DApp
This project is a digital tip jar (micro-payment) dApp built using Stellar and Soroban for content creators, developers, and artists. It allows users to easily receive support through a "Buy me a coffee" button that can be embedded on their websites or profiles.

🚀 Features
Next.js based modern frontend

Rust / Soroban smart contracts

🔑 Freighter wallet integration

💸 Fast and easy micro-payments with near-zero transaction fees on the Stellar network

🔗 Tracking of tips and total amount via the smart contract

🎨 Sleek and intuitive user interface with Tailwind CSS

📂 Project Structure
/contract
  ├── src
  │   └── lib.rs         # Smart contract logic
  └── Cargo.toml         # Rust project configuration
/app
  └── page.tsx           # Next.js main page component
/tailwind.config.js      # Tailwind configuration
/package.json            # Node.js dependencies
/README.md               # This document

🛠️ Installation
1️⃣ Clone the repo:

git clone https://github.com/<your_username>/<your_repo_name>.git
cd <your_repo_name>

2️⃣ Install frontend dependencies:

npm install
# or
yarn install

(Ensure you have @stellar/freighter-api and stellar-sdk in your package.json)

3️⃣ Start the development server:

npm run dev

4️⃣ To build the smart contract:

# Navigate to the 'contract' directory
cd contract

# Build the contract
soroban contract build

⚙️ Usage
Build and deploy your smart contract to the test network (soroban contract deploy ...), and take note of the new contract ID.

Update the contractId state in the app/page.tsx file with your own deployed contract ID.

Open the application in your browser (http://localhost:3000) and connect your Freighter wallet.

To support, enter the amount and a note, then click the "Send Tip" button and approve the transaction in Freighter.