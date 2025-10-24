import { Block, Blockchain, Transaction } from "./blockchain";





const chain = new Blockchain();



const block = new Block(new Date(), chain.pendingTransactions);
chain.createTransaction(new Transaction("sashi", "heidi", 100))
chain.createTransaction(new Transaction("heidi", "sashi", 50));

chain.minePendingTransactions("sashi");



chain.getBalance("heidi");

chain.minePendingTransactions("sashi");
chain.getBalance("sashi");


