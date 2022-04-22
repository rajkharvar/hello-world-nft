/* eslint-disable node/no-unsupported-features/es-syntax */
import { useQuery } from "@apollo/client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../components/Card";
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
  const { data, loading } = useQuery(FETCH_NFTS);
  const [nfts, setNFTs] = useState<null | NFT[]>(null);

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
    }

    if (data?.nfts.length) {
      fetchNFTMetadata(data.nfts);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      {nfts ? (
        <Flex flexWrap="wrap">
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
