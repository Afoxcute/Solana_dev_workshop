import {
    Transaction,
    SystemProgram,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import wallet from "./dev-wallet.json";
  
  const from = Keypair.fromSecretKey(new Uint8Array(wallet));
  const to = new PublicKey("ErQh1bVN4ciHWNMZw5DmiE7md9E7G2HbBxm6tX3xqvoz");
  const connection = new Connection("https://api.devnet.solana.com");
//   const balance = await connection.getBalance(from.publicKey);

  
  (async () => {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: LAMPORTS_PER_SOL / 100,
        })
      );
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;
  
      const balance = await connection.getBalance(from.publicKey);

      transaction.feePayer = from.publicKey;
      if (balance == 0) {
        connection.requestAirdrop(from.publicKey, 2 * LAMPORTS_PER_SOL);
      } else {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance,
          })
        );
      }
      transaction.feePayer = from.publicKey;
      transaction;
    }


    catch (e) {
      console.error(`Oops, something went wrong: ${e}`);
    }
  })();
  


