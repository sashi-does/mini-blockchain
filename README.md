# 🪙 Bitcoin-Sim — A Mini Bitcoin Blockchain Network (Built with Bun + WebSockets)

A lightweight **Bitcoin simulation** built fully with **Bun**, **TypeScript**, and **WebSockets**.  
It demonstrates how miners, transactions, and consensus work — in real time.

---

## 🚀 Overview

This simulation includes:

- 🌐 A **WebSocket server** that relays messages between all miners  
- ⛏️ Multiple **miner nodes** that pick pending transactions and mine blocks  
- 💰 A **mempool** that stores unconfirmed transactions  
- 🔒 **Proof-of-Work** algorithm for mining  
- ⚖️ **Longest Chain Rule** for consensus  
- 🔑 **Wallet system** using elliptic key pairs

---

## 🧱 Project Structure

```bash
bitcoin-sim/
│
├── server/
│   ├── index.ts          # WebSocket central server
│   └── mempool.ts        # In-memory transaction pool
│
├── miner/
│   ├── miner.ts          # Miner process
│   ├── blockchain.ts     # Blockchain + consensus
│   ├── transaction.ts    # Transaction structure
│   └── wallet.ts         # Wallet + signing
│
└── README.md
