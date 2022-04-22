import { useQuery } from "@apollo/client";
import {
  Button,
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
import { ethers } from "ethers";
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
    <Container p={0} m={12}>
      {nft ? (
        <HStack w="full" spacing={4}>
          <Image src={nft.image} alt={nft.description} />
          <VStack p={0} m={0}>
            <Heading>
              {nft.title} #{nft.id}
            </Heading>
            <Text fontSize="sm">{nft.description}</Text>
            <Text>Owned by {nft.owner}</Text>
            <Text fontSize="md" m={0}>
              Price
            </Text>
            <Text fontSize="lg">{ethers.utils.formatEther(nft.price)}</Text>
            <HStack>
              <Button variant="outline" colorScheme="twitter">
                Buy Now
              </Button>
            </HStack>
          </VStack>
        </HStack>
      ) : (
        <Text>No NFT fouund with id {id}</Text>
      )}
    </Container>
  );
};

export default Asset;
