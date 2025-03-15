export const HOLESKY_CHAIN_ID = 17000;

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x0cD252390E7e46D7Ecf48D225fBB56D8fBd6Faf1";

export const holeskyInfo = {
  rpcUrls: "https://ethereum-holesky.publicnode.com",
  chainName: "Holesky",
  blockExplorerUrls: "https://holesky.etherscan.io/",
  nativeCurrency: {
    name: "Holesky Ether",
    symbol: "ETH",
    decimals: 18,
  },
};
