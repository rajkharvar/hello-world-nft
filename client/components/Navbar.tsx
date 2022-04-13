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
import { useRouter } from "next/router";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const router = useRouter();

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
        <Button variant="ghost">My Assets</Button>
        <Button variant="solid" colorScheme="cyan">
          Connect Wallet
        </Button>
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
