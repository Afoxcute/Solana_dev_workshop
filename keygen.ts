import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import * as prompt from 'prompt-sync';
import { Connection, LAMPORTS_PER_SOL } from
"@solana/web3.js";
import wallet from "./dev-wallet.json"

let kp = Keypair.generate()
console.log(`You've generated a new Solana wallet:
${kp.publicKey.toBase58()}
[${kp.secretKey}]`)

