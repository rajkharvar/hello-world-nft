import {
  Box,
  Badge,
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

const Card: FC<{ nft: NFT }> = ({ nft }) => {
  const router = useRouter();

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      key={nft.id}
      m={4}
    >
      <Image src={nft.image} alt={nft.title} />

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
            {nft.title} #{nft.id}
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
          <Box>
            <Text color="teal">{getTruncatedAddress(nft.owner)}</Text>
          </Box>

          <Box display="flex" mt="2" justifyContent="flex-end">
            <Tag my={4} variant="outline">
              <TagLabel>{ethers.utils.formatEther(nft.price)}</TagLabel>
              <TagRightIcon as={FaEthereum} />
            </Tag>
          </Box>
        </Flex>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outline" colorScheme="teal" disabled={!nft.onSale}>
            Buy Now
          </Button>
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
