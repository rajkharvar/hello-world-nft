import { useQuery } from "@apollo/client";
import {
  Center,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
  Flex,
  TagLabel,
  TagRightIcon,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { FaEthereum } from "react-icons/fa";

import CustomSpinner from "../../components/CustomSpinner";
import { FETCH_NFT } from "../../utils/queries";
import { NFT } from "../explore";
import BuyButton from "../../components/BuyButton";

const Asset = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState<null | NFT>(null);

  const { data } = useQuery(FETCH_NFT, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    const fetchData = async (nft: NFT) => {
      const url = nft.tokenURI.replace(".infura", "");
      const res = await axios.get(url);
      setNft({ ...res.data, ...nft });
      setIsLoading(false);
    };

    if (data) {
      console.log(data);
      if (data?.nft) {
        fetchData(data.nft);
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
      {nft ? (
        <>
          <Head>
            <title>
              {nft.title} #{nft.id}
            </title>
          </Head>
          <Box borderWidth="1px" m={2} p={4}>
            <Center>
              <Heading>NFT Details</Heading>
            </Center>
            <Flex
              p={[0, 8, 16]}
              w="full"
              direction={{
                base: "column",
                lg: "row",
              }}
            >
              <Image
                maxW="768px"
                objectFit="cover"
                src={nft.image.replace(".infura", "")}
                alt={nft.description}
              />
              <VStack
                w="full"
                p={0}
                m={0}
                ml={[0, 0, 0, 10]}
                alignItems={{
                  base: "center",
                  lg: "flex-start",
                }}
                mt={[0, 10, 10]}
              >
                <Heading>
                  {nft.title} #{nft.id}
                </Heading>
                <Text fontSize="md">{nft.description}</Text>
                <HStack>
                  <Text>Owned by </Text>
                  <Text color="blue.500">
                    {nft.owner.substring(0, 6)}
                    ...
                    {nft.owner.substring(
                      nft.owner.length - 4,
                      nft.owner.length
                    )}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize="md" m={0}>
                    Price
                  </Text>
                  <Tag variant="subtle" colorScheme="cyan">
                    <TagLabel>{ethers.utils.formatEther(nft.price)}</TagLabel>
                    <TagRightIcon as={FaEthereum} />
                  </Tag>
                </HStack>
                <HStack>
                  <BuyButton nft={nft} />
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </>
      ) : (
        <Center mt={4}>
          <Text fontSize="3xl">No NFT found with id {id}</Text>
        </Center>
      )}
    </>
  );
};

export default Asset;
