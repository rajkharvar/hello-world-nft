import {
  Heading,
  Flex,
  VStack,
  Text,
  Button,
  Image,
  AspectRatio,
  HStack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();
  return (
    <Flex py={24} m="auto" maxW="3xl">
      <VStack alignItems="flex-start" spacing={8}>
        <Heading size="xl">
          Discover, collect and sell finest Hello World 💻 NFTs
        </Heading>
        <Text fontSize="xl">
          Hello World NFTs marketplace is currently live on Holeksy
        </Text>
        <HStack spacing={8}>
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => router.push("/explore")}
          >
            Explore
          </Button>
          <Button variant="solid" onClick={() => router.push("/explore")}>
            My Assets
          </Button>
        </HStack>
      </VStack>
      <VStack>
        <AspectRatio ratio={1} w={[24, 48, 72]}>
          <Image
            src="https://media.giphy.com/media/fmkYSBlJt3XjNF6p9c/giphy.gif"
            alt="Banner gif"
          />
        </AspectRatio>
      </VStack>
    </Flex>
  );
};

export default Banner;
