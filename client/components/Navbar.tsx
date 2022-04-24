import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Blockies from "react-blockies";

import { injected, isAuthorized } from "../utils/connector";
import { maticMumbaiInfo, MATIC_MUMBAI_CHAIN_ID } from "../utils/constants";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const router = useRouter();
  const { activate, account, chainId } = useWeb3React();
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    activate(injected);
    isAuthorized().then((isAuthorized) => {
      setAuthorized(isAuthorized);
    });
  }, []);

  const switchNetwork = async () => {
    if ((window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(MATIC_MUMBAI_CHAIN_ID) }],
        });
      } catch (switchError) {
        if ((switchError as any)?.code === 4902) {
          try {
            await (window as any).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: utils.hexValue(MATIC_MUMBAI_CHAIN_ID),
                  rpcUrls: maticMumbaiInfo.rpcUrls,
                  chainName: maticMumbaiInfo.chainName,
                  blockExplorerUrls: maticMumbaiInfo.blockExplorerUrls,
                  nativeCurrency: {
                    ...maticMumbaiInfo.nativeCurrency,
                  },
                },
              ],
            });
          } catch (addError) {
            console.log("addError", addError);
          }
        }
      }
    }
  };

  // authorized && account -> Connected to correct chain
  // authorized && !account -> Connected to wrong chain
  // error -> isInstance of NoEthereumProviderError -> Show toast to install metamask

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="full"
      px={[0, 10, 20]}
      py={4}
      backgroundColor={bgColor}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Button variant="unstyled" onClick={() => router.push("/")}>
        <Heading size="lg" fontFamily="inter">
          Hello World NFT
        </Heading>
      </Button>
      <HStack spacing={6}>
        <Button variant="ghost" onClick={() => router.push("/explore")}>
          Explore
        </Button>
        <Button variant="ghost" onClick={() => router.push("/my-assets")}>
          My Assets
        </Button>
        {authorized && account && (
          <>
            <Blockies seed={account} size={10} scale={3} />
            <Text colorScheme="teal">
              {account.substring(0, 4)}...
              {account.substring(account.length - 4)}
            </Text>
          </>
        )}
        {authorized && chainId !== MATIC_MUMBAI_CHAIN_ID && (
          <Button variant="outline" colorScheme="red" onClick={switchNetwork}>
            Switch Network
          </Button>
        )}
        {!authorized && (
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => activate(injected)}
          >
            Connect Wallet 🦊
          </Button>
        )}
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Flex>
  );
};

export default Navbar;
