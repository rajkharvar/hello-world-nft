import { useQuery } from "@apollo/client";
import {
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomSpinner from "../../components/CustomSpinner";
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
    return <CustomSpinner />;
  }

  return (
    <>
      {nft ? (
        <HStack p={16} w="full" spacing={6}>
          <Image src={nft.image} alt={nft.description} />
          <VStack
            w="full"
            p={0}
            m={0}
            // justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading>
              {nft.title} #{nft.id}
            </Heading>
            <Text fontSize="md">{nft.description}</Text>
            <HStack>
              <Text>Owned by </Text>
              <Text color="teal">
                {nft.owner.substring(0, 6)}
                ...
                {nft.owner.substring(nft.owner.length - 4, nft.owner.length)}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="md" m={0}>
                Price
              </Text>
              <Tag variant="subtle" colorScheme="cyan">
                {ethers.utils.formatEther(nft.price)}
              </Tag>
            </HStack>
            <HStack>
              <Button
                variant="outline"
                colorScheme="twitter"
                disabled={!nft.onSale}
              >
                Buy Now
              </Button>
            </HStack>
          </VStack>
        </HStack>
      ) : (
        <Center mt={4}>
          <Text fontSize="3xl">No NFT found with id {id}</Text>
        </Center>
      )}
    </>
  );
};

export default Asset;
