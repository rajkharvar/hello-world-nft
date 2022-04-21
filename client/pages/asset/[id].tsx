import { useQuery } from "@apollo/client";
import {
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FETCH_NFT } from "../../utils/queries";
import { NFT } from "../explore";

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
      const res = await axios.get(nft.tokenURI);
      setNft({ ...res.data, ...nft });
    };

    if (data) {
      console.log(data);
      if (data?.nft) {
        fetchData(data.nft);
      }
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Flex w="full" height="full" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Container m={0} p={0}>
      {nft ? (
        <HStack w="full">
          <Image src={nft.image} alt={nft.description} />
          <VStack w="full">
            <Heading>{nft.title}</Heading>
            <Text fontSize="sm">{nft.description}</Text>
          </VStack>
        </HStack>
      ) : (
        <Text>No NFT fouund with id {id}</Text>
      )}
    </Container>
  );
};

export default Asset;
