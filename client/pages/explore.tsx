/* eslint-disable node/no-unsupported-features/es-syntax */
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import CustomSpinner from "../components/CustomSpinner";
import { FETCH_NFTS } from "../utils/queries";

export type NFT = {
  id: string;
  onSale: boolean;
  owner: string;
  price: string;
  tokenId: string;
  tokenURI: string;
  image: string;
  title: string;
  description: string;
};

const Explore: NextPage = () => {
  const { data } = useQuery(FETCH_NFTS);
  const [nfts, setNFTs] = useState<null | NFT[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <>
      {nfts ? (
        <Flex flexWrap="wrap" justifyContent="space-around">
          {nfts.map((nft) => (
            <Card nft={nft} key={nft.id} />
          ))}
        </Flex>
      ) : (
        <Text>No NFTs found</Text>
      )}
    </>
  );
};

export default Explore;
