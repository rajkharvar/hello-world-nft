import { Chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { HOLESKY_CHAIN_ID, holeskyInfo } from "./constants";

// Define Holesky testnet as a custom chain for wagmi
const holeskyChain: Chain = {
  id: HOLESKY_CHAIN_ID,
  name: holeskyInfo.chainName,
  network: "holesky",
  nativeCurrency: {
    name: holeskyInfo.nativeCurrency.name,
    symbol: holeskyInfo.nativeCurrency.symbol,
    decimals: holeskyInfo.nativeCurrency.decimals,
  },
  rpcUrls: {
    default: {
      http: [holeskyInfo.rpcUrls],
    },
    public: {
      http: [holeskyInfo.rpcUrls],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: holeskyInfo.blockExplorerUrls,
    },
  },
  testnet: true,
};

// Configure chains and providers
const { chains, provider } = configureChains(
  [holeskyChain],
  [publicProvider()]
);

// Set up connectors
const { connectors } = getDefaultWallets({
  appName: "Hello World NFT",
  projectId: "your-project-id", // Get a project ID from WalletConnect Cloud: https://cloud.walletconnect.com
  chains,
});

// Create wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains };
