import { Button, useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { FC, useState } from "react";
import { NFT } from "../pages/explore";
import { CONTRACT_ADDRESS } from "../utils/constants";
import NFTAbi from "../abi/NFT.json";

const BuyButton: FC<{ nft: NFT }> = ({ nft }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWeb3React();
  const toast = useToast();

  const handleTxRejected = () => {
    toast({
      status: "error",
      title: "Transaction rejected",
      isClosable: true,
    });
  };

  const getContractInstance = () => {
    if ((window as any).ethereum && account) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const nftInstance = new ethers.Contract(CONTRACT_ADDRESS, NFTAbi, signer);
      return nftInstance;
    }
  };

  const createMarketSale = async () => {
    setIsLoading(true);
    try {
      const nftInstance = getContractInstance();
      if (nftInstance) {
        const tx = await nftInstance.createMarketSale(nft.tokenId, {
          value: nft.price,
        });
        console.log("Tx");
        console.log(tx);
        await tx.wait();
        toast({
          title: "Transaction successful!!!",
          description: "NFT successfully bought",
          isClosable: true,
          status: "success",
        });
      }
    } catch (error: any) {
      if (error.code === 4001) {
        handleTxRejected();
      } else {
        console.log("Error occured while buying NFT");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      colorScheme="teal"
      disabled={!nft.onSale || !account}
      isLoading={isLoading}
      onClick={createMarketSale}
      variant="outline"
    >
      Buy Now
    </Button>
  );
};

export default BuyButton;
