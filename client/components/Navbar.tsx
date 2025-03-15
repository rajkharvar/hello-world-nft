import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { HOLESKY_CHAIN_ID } from "../utils/constants";
import AccountDetails from "./AccountDetails";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isCorrectNetwork = chain?.id === HOLESKY_CHAIN_ID;

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
        {/* {isConnected && isCorrectNetwork && address && (
          <AccountDetails account={address} />
        )} */}
        {isConnected && !isCorrectNetwork && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => switchNetwork?.(HOLESKY_CHAIN_ID)}
          >
            Switch Network
          </Button>
        )}
        <ConnectButton />
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
