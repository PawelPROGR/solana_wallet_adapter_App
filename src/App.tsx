import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Wallet from "./components/Wallet/Wallet"
import React, { FC, useState, useEffect, useMemo } from 'react';

export default function App() {

  const wallet = useAnchorWallet()

  return (
    <>
      <p>
        Anchor wallet: {wallet && wallet.publicKey.toBase58()}
      </p>
      <Wallet />
    </>
  );
}
