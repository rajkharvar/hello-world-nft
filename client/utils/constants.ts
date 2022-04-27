export const MATIC_MUMBAI_CHAIN_ID = 80001;

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x179248E4Ae3531A24589517C0E0123AB83cD64B5";

export const maticMumbaiInfo = {
  rpcUrls: "https://rpc-mumbai.matic.today",
  chainName: "Mumbai",
  blockExplorerUrls: "https://mumbai.polygonscan.com/",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
};
