/* eslint-disable node/no-unsupported-features/es-syntax */
import { useQuery } from "@apollo/client";
import { Badge, Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FETCH_NFTS } from "../utils/queries";

type NFT = {
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
        nfts.map((nft) => (
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            key={nft.id}
            m={4}
          >
            <Image src={nft.image} alt={nft.image} />

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {nft.title}
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {nft.description}
              </Box>

              <Box display="flex" mt="2" justifyContent="flex-end">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {ethers.utils.formatEther(nft.price)} ETH
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No NFTs found</Text>
      )}
    </>
  );
};

export default Explore;
