import {
  Box,
  Image,
  Button,
  Tag,
  TagLabel,
  TagRightIcon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaEthereum } from "react-icons/fa";

import { NFT } from "../pages/explore";
import { getTruncatedAddress } from "../utils/address";
import BuyButton from "./BuyButton";

const Card: FC<{ nft: NFT }> = ({ nft }) => {
  const router = useRouter();

  return (
    <Box
      w="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      key={nft.id}
      m={4}
    >
      <Image h="40" src={nft.image.replace(".infura", "")} alt={nft.title} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            as="h3"
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {nft.title}#{nft.id}
            <Tag colorScheme={nft.onSale ? "teal" : "red"} ml={4}>
              {nft.onSale ? "On Sale" : "Sold"}
            </Tag>
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

        <Flex alignItems="center" justifyContent="space-between">
          <Box display="flex">
            <Text>Owned by</Text>
            <Text ml={1} color="blue.500">
              {getTruncatedAddress(nft.owner)}
            </Text>
          </Box>

          <Box display="flex" mt="2" justifyContent="flex-end">
            <Tag my={4} variant="outline">
              <TagLabel>{ethers.utils.formatEther(nft.price)}</TagLabel>
              <TagRightIcon as={FaEthereum} />
            </Tag>
          </Box>
        </Flex>
        <Box display="flex" justifyContent="space-between">
          <BuyButton nft={nft} />
          <Button
            colorScheme="teal"
            onClick={() => router.push(`/asset/${nft.id}`)}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
