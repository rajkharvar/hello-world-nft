import { useLazyQuery } from "@apollo/client";
import { Center, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

import { NFT } from "./explore";
import CustomSpinner from "../components/CustomSpinner";
import { FETCH_USER_NFTS } from "../utils/queries";
import Asset from "../components/Asset";

const MyAssets = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNFTs] = useState<null | NFT[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchUserNFT, { data }] = useLazyQuery(FETCH_USER_NFTS);

  useEffect(() => {
    if (address) {
      fetchUserNFT({
        variables: {
          owner: address,
        },
      });
    }
  }, [address]);

  useEffect(() => {
    async function fetchNFTMetadata(nfts: NFT[]) {
      const nftMetadata = await Promise.all(
        nfts.map(async (nft) => {
          const url = nft.tokenURI.replace(".infura", "");
          const metadata = await axios.get(url);
          return {
            ...nft,
            ...metadata.data,
          };
        })
      );

      setNFTs(nftMetadata);
      setIsLoading(false);
    }

    if (data) {
      if (data?.nfts.length) {
        fetchNFTMetadata(data.nfts);
      } else {
        setIsLoading(false);
      }
    }
  }, [data]);

  if (!isConnected) {
    return (
      <Center mt={4}>
        <Text fontSize="3xl">Please connect your wallet!</Text>
      </Center>
    );
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  return nfts ? (
    <>
      <Center mt={4}>
        <Text fontSize="3xl">You have {nfts.length} NFT</Text>
      </Center>
      {nfts.map((nft: NFT) => (
        <Asset key={nft.id} nft={nft} />
      ))}
    </>
  ) : (
    <Center mt={4}>
      <Text fontSize="3xl">You don't have any NFT</Text>
    </Center>
  );
};

export default MyAssets;
