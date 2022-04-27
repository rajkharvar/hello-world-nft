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
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaEthereum } from "react-icons/fa";

import { NFT } from "../pages/explore";
import { getTruncatedAddress } from "../utils/address";
import NFTAbi from "../abi/NFT.json";
import { CONTRACT_ADDRESS } from "../utils/constants";

const Card: FC<{ nft: NFT }> = ({ nft }) => {
  const router = useRouter();
  const { account } = useWeb3React();

  const getContractInstance = () => {
    if ((window as any).ethereum && account) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const NFT = new ethers.Contract(CONTRACT_ADDRESS, NFTAbi, signer);
      return NFT;
    }
  };

  const createMarketSale = async () => {
    try {
      const nftInstance = getContractInstance();
      if (nftInstance) {
        const tx = await nftInstance.createMarketSale(nft.tokenId, {
          value: nft.price,
        });
        console.log("Waiting for user approval for tx");
        await tx.wait();
        console.log("Tx successfull");
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

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
          <Box
            as="h3"
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {nft.title}#{nft.id}
            <Badge
              variant="outline"
              colorScheme={nft.onSale ? "teal" : "red"}
              ml={4}
              p={1}
            >
              {nft.onSale ? "On Sale" : "Sold"}
            </Badge>
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
          <Button
            variant="outline"
            colorScheme="teal"
            disabled={!nft.onSale || !account}
            onClick={createMarketSale}
          >
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
