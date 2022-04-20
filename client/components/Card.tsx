import { Box, Badge, Image, Button, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import { FC } from "react";
import { NFT } from "../pages/explore";

const Card: FC<{ nft: NFT }> = ({ nft }) => {
  const bgColor = useColorModeValue("gray.700", "gray.100");

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
          <Box as="span" ml="2" color={bgColor} fontSize="sm">
            {ethers.utils.formatEther(nft.price)} ETH
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outline" colorScheme="teal" disabled={!nft.onSale}>
            Buy Now
          </Button>
          <Button colorScheme="teal">View Details</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
