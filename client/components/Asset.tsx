import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";

import NFTAbi from "../abi/NFT.json";
import { NFT } from "../pages/explore";
import { CONTRACT_ADDRESS } from "../utils/constants";

const Asset: FC<{ nft: NFT }> = ({ nft }) => {
  const [price, setPrice] = useState<string | number>("");
  const [isTxPending, setIsTxPending] = useState<boolean>(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { account } = useWeb3React();
  const router = useRouter();
  const toast = useToast();

  const handleTxRejected = () => {
    toast({
      status: "error",
      title: "Transaction rejected",
      isClosable: true,
    });
  };

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

  const createMarketItem = async () => {
    setIsTxPending(true);
    try {
      const nftInstance = getContractInstance();
      if (nftInstance) {
        const priceInBN = ethers.utils.parseEther(price.toString());
        const tx = await nftInstance.createMarketItem(nft.id, priceInBN);
        console.log("Waiting for user approval for tx");
        console.log("tx");
        console.log(tx);
        await tx.wait();
        toast({
          title: "Transaction successful!!!",
          description: "Successfully listed NFT for sale",
          isClosable: true,
          status: "success",
        });
        onClose();
      }
    } catch (error: any) {
      if (error.code === 4001) {
        handleTxRejected();
      } else {
        console.log("Error occured while creating market sale");
        console.log(error);
      }
    } finally {
      setIsTxPending(false);
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to sell NFT #{nft.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Once NFT is listed for sale it cannot be reverted
            <InputGroup mt={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaEthereum} />}
              />
              <Input
                type="number"
                placeholder="Price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isRequired
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="blue"
              disabled={price === "" || price === 0}
              onClick={createMarketItem}
              isLoading={isTxPending}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Image src={nft.image.replace(".infura", "")} alt={nft.title} />

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

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button variant="outline" colorScheme="teal" onClick={onOpen}>
            Sell NFT
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

export default Asset;
