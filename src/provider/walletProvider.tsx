import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { PhantomWalletAdapter} from "@solana/wallet-adapter-phantom";
import { SolletWalletAdapter, SolletExtensionWalletAdapter } from "@solana/wallet-adapter-sollet";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-slope";
import {SolflareWalletAdapter} from "@solana/wallet-adapter-solflare";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function Wallet({ children }: Props) {
    const network = WalletAdapterNetwork.Mainnet;
    const rpc = clusterApiUrl(network);

    const walletList = [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolletWalletAdapter(),
        new SolletExtensionWalletAdapter()
    ]

    return (
        <ConnectionProvider endpoint={rpc} config={{
            commitment: "finalized"
        }}>
            <WalletProvider wallets={walletList} autoConnect>
                <WalletDialogProvider>
                    {children}
                </WalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
