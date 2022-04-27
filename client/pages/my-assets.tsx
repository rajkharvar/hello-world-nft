import { useLazyQuery } from "@apollo/client";
import { Center, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import axios from "axios";

import { NFT } from "./explore";
import CustomSpinner from "../components/CustomSpinner";
import { FETCH_USER_NFTS } from "../utils/queries";
import Asset from "../components/Asset";

const MyAssets = () => {
  const { account } = useWeb3React();
  const [nfts, setNFTs] = useState<null | NFT[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchUserNFT, { data }] = useLazyQuery(FETCH_USER_NFTS);

  useEffect(() => {
    if (account) {
      fetchUserNFT({
        variables: {
          owner: account,
        },
      });
    }
  }, []);

  useEffect(() => {
    async function fetchNFTMetadata(nfts: NFT[]) {
      const nftMetadata = await Promise.all(
        nfts.map(async (nft) => {
          const metadata = await axios.get(nft.tokenURI);
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

  if (!account) {
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
        <Asset nft={nft} />
      ))}
    </>
  ) : (
    <Center mt={4}>
      <Text fontSize="3xl">You don't have any NFT</Text>
    </Center>
  );
};

export default MyAssets;
