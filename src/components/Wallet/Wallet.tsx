import React, { FC, useState, useEffect, useMemo } from 'react';
import { InputChangeEventHandler } from '../types'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { NATIVE_MINT, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createSyncNativeInstruction, getAccount } from "@solana/spl-token";
import { Connection, PublicKey, Transaction, clusterApiUrl, Keypair, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Wallet.css'
import { useAnchorWallet } from "@solana/wallet-adapter-react";

declare global {
    interface Window { solana: any; }
}

export const Wallet: FC = () => {
    const network = WalletAdapterNetwork.Testnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const connection = new Connection(endpoint);

    const [balance, setBalance] = useState<Number>()

    const wallets = [
        new PhantomWalletAdapter({ network })
    ];

    const wallet = useAnchorWallet()

    useEffect(() => {
        send();
    }, [wallets]);

    const send = async () => {
        try {
            let key = (wallet?.publicKey.toBase58())?.toString();
            let walletun = new PublicKey(`${key}`);
            let balance = await connection.getBalance(walletun);
            console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
            setBalance(balance / LAMPORTS_PER_SOL)
        }
        catch (e) {
            console.log(e)
        }
    }

    const constSend2 = () => {
        console.log(balance)
    }

    return (
        <ConnectionProvider endpoint={endpoint} config={{ commitment: "finalized" }}>
            {/* <WalletProvider wallets={wallets} autoConnect> */}
            <WalletModalProvider>
                <div className="App">
                        <div style={{color: 'black', position: 'relative', left: '8px'}}>
                            <>
                                Баланс - {balance}
                            </>
                        </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ margin: 40 }}>Подключится к phantom</h1>
                        <button onClick={constSend2} style={{ padding: 10, marginTop: 20, marginBottom: 20 }}>Получить</button>
                        <WalletMultiButton />
                        <WalletDisconnectButton style={{ backgroundColor: 'yellow' }} />
                        <div className='balance-info'>
                            {wallets[0].publicKey?.toString()}
                        </div>
                    </div>
                </div>
            </WalletModalProvider>
            {/* </WalletProvider> */}
        </ConnectionProvider >
    )
}

export default Wallet;
