import React, { FC, useState, useEffect, useMemo } from 'react';
// import '../../App.css';
import { InputChangeEventHandler } from '../types'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { NATIVE_MINT, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createSyncNativeInstruction, getAccount } from "@solana/spl-token";
import { Connection, PublicKey, Transaction, clusterApiUrl, Keypair, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Wallet.css'
import { useAnchorWallet } from "@solana/wallet-adapter-react";

// require('@solana/wallet-adapter-react-ui/styles.css');

declare global {
    interface Window { solana: any; }
}

// window.MyNamespace = window.MyNamespace || {};

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
        // const wallet = useWallet()
        if (wallet && wallet.publicKey.toBase58()) {
            // const SOL = connection.getAccountInfo(wallet.publicKey)
            // console.log(infoWallet)
            // SOL.then((res) => setSOLBalance(res.lamports / LAMPORTS_PER_SOL))
        }
    }, [])


    useEffect(() => {
        send();
    }, [wallets]);

    const send = async () => {
        try {
            // console.log(wallets[0])
            // console.log(wallets[0].connected)
            let key = (wallet?.publicKey.toBase58())?.toString();
            console.log(key)
            // console.log(wallet)
            let walletun = new PublicKey(`${key}`);
            console.log(walletun);
            let balance = await connection.getBalance(walletun);
            console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
            setBalance(balance / LAMPORTS_PER_SOL)
            if (wallet && wallet.publicKey.toBase58()) {
                // const SOL = connection.getAccountInfo(wallet.publicKey)
                // console.log(SOL)
                // SOL.then((res) => setSOLBalance(res.lamports / LAMPORTS_PER_SOL))
                // let balance = await connection.getBalance(wallet.publicKey.toBase58());
                // console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
                // console.log(infoWallet)

            }
            // setPublicKey(wallets[0].publicKey?.toString())
            // console.log(provider._publicKey.toString())
            // console.log(connection)
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
                    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                     <div style={{ margin: 40 }}>Wallet</div>
                                     <button onClick={send} style={{ padding: 10 }}>Отправить 1,5 токена</button>
                                     <button onClick={() => phantomWalletDisconnect()} style={{ padding: 10, marginTop: 20 }}>Отключится</button>
                                     <WalletDisconnectButton style={{ backgroundColor: 'yellow' }} onClick={logOut} />
                                 </div> */}
                        <div style={{color: 'black', position: 'relative', left: '8px'}}>
                            <>
                                Баланс - {balance}
                            </>
                        </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ margin: 40 }}>Подключится к phantom</h1>
                        {/* <button onClick={() => phantomWalletConnect()} style={{ padding: 10, marginTop: 20 }}>Подлючится</button> */}
                        <button onClick={constSend2} style={{ padding: 10, marginTop: 20, marginBottom: 20 }}>Получить</button>
                        {/* <WalletConnectButton /> */}
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
