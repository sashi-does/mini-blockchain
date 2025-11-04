# Mini Blockchain Implementation

> A TypeScript-based blockchain implementation with mining capabilities and WebSocket-powered peer-to-peer communication built with Bun runtime.

[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh)  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)  [![WebSocket](https://img.shields.io/badge/WebSocket-010101?logo=socketdotio&logoColor=fff)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## Features

- **Complete Blockchain Core** - Block creation, validation, and chain management
- **Proof-of-Work Mining** - CPU-based mining with difficulty adjustment
- **WebSocket P2P Network** - Real-time peer communication using WebSockets
- **Consensus Mechanism** - Distributed consensus for chain synchronization
- **Transaction System** - Create and validate transactions
- **Wallet Management** - Manage blockchain wallets and addresses
- **Bun Runtime** - Fast JavaScript runtime for optimal performance

## Project Structure

```
├── miner/              # Mining node implementation
│   ├── src/
│   │   ├── helper.ts   # Mining utility functions
│   │   └── index.ts    # Miner entry point
│   ├── package.json
│   └── tsconfig.json
│
├── packages/           # Core blockchain logic
│   ├── src/
│   │   ├── block.ts        # Block structure and validation
│   │   ├── blockchain.ts   # Blockchain management
│   │   ├── example.ts      # Usage examples
│   │   ├── response.ts     # API response types
│   │   ├── transaction.ts  # Transaction handling
│   │   └── wallet.ts       # Wallet functionality
│   ├── package.json
│   └── tsconfig.json
│
├── server/             # WebSocket server and consensus
│   ├── src/
│   │   ├── consensus.ts    # Consensus algorithm
│   │   ├── example.ts      # Server examples
│   │   ├── index.ts        # Main server entry
│   │   ├── miners.ts       # Miner management
│   │   └── socket.ts       # WebSocket implementation
│   ├── types/              # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
│
├── package.json        # Root package configuration
└── tsconfig.json       # Root TypeScript config
```

##  Tech Stack

- **Runtime:** [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Language:** TypeScript
- **Communication:** WebSockets for real-time P2P networking
- **Package Manager:** Bun (npm-compatible)

## Prerequisites

- [Bun](https://bun.sh) installed on your system
- Basic understanding of blockchain concepts
- Node.js (optional, for compatibility)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mini-blockchain
```

2. Install dependencies:
```bash
bun install
```

3. Install dependencies for each package:
```bash
cd miner && bun install && cd ..
cd packages && bun install && cd ..
cd server && bun install && cd ..
```

## Usage

### Starting the Server

The server handles WebSocket connections and manages the blockchain consensus:

```bash
cd server
bun run src/index.ts
```

### Running a Miner

Start mining blocks and contributing to the blockchain:

```bash
cd miner
bun run src/index.ts
```

### Using the Core Package

```typescript
import { Blockchain, Block, Transaction, Wallet } from './packages/src';

// Create a new blockchain
const blockchain = new Blockchain();

// Create a wallet
const wallet = new Wallet();

// Create and add transactions
const transaction = new Transaction(sender, recipient, amount);
blockchain.addTransaction(transaction);

// Mine a new block
const newBlock = blockchain.mineBlock(wallet.address);
```

## WebSocket API

The server exposes WebSocket endpoints for peer communication:

### Connection
```
ws://localhost:<PORT>
```

### Message Types
- **WELCOME** – Sent when a new node or miner connects to the network  
- **BLOCK_ACCEPTED** – Indicates a mined block has been accepted by a miner  
- **BLOCK_REJECTED** – Indicates a mined block has been rejected by a miner 
- **NEW_BLOCK** – Broadcast newly mined blocks  
- **INVALID_MINER_ADDRESS** – Sent when a miner’s address is invalid  
- **INVALID_TXNS** – Notifies about invalid transactions in a proposed block  
- **VALID_TXNS** – Confirms transactions are valid and ready for inclusion  
- **BLOCK_FINALIZED** – Confirms that a block has been added to the main chain after consensus 
- **BLOCK_DISCARDED** – Indicates a block was dropped or replaced due to fork resolution after consensus
- **CHAIN_UPDATE** – Broadcasts when a node’s blockchain is updated  

###️ Core Components

### Block Structure
Each block contains:
- Index
- Timestamp
- Transactions
- Previous hash
- Hash
- Nonce (for Proof-of-Work)
- Difficulty

### Blockchain
Manages the chain of blocks with:
- Block validation
- Chain validation
- Difficulty adjustment
- Transaction pool management

### Transaction
Handles transfer of value between addresses with:
- Digital signatures
- Transaction validation
- Input/output management

### Wallet
Manages user credentials:
- Public/private key pairs
- Address generation
- Transaction signing

### Consensus
Implements the longest chain rule:
- Chain synchronization
- Conflict resolution
- Network agreement

### Mining
Proof-of-Work implementation:
- Hash computation
- Difficulty target
- Block reward system

## Security Features

- **Cryptographic Hashing** - SHA-256 for block integrity
- **Digital Signatures** - Transaction authentication
- **Proof-of-Work** - Network security through computational difficulty
- **Chain Validation** - Continuous verification of blockchain integrity

## Development

### Running Examples

Each package includes example files demonstrating functionality:

```bash
# Blockchain examples
cd packages
bun run src/example.ts

# Server examples
cd server
bun run src/example.ts
```

### Building

```bash
# Build all packages
bun run build

# Or build individually
cd packages && bun run build
cd server && bun run build
cd miner && bun run build
```

## Configuration

Configuration files are managed through `tsconfig.json` in each package. Adjust settings as needed for your environment.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [WebSocket Protocol](https://bun.com/docs/runtime/http/websockets)
- [Blockchain Basics](https://bitcoin.org/bitcoin.pdf)

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ⚡ Bun and 🔗 WebSockets
