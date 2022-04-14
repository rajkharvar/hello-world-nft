import { Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Banner from "../components/Banner";

const Home: NextPage = () => {
  return (
    <Container p={0} maxW="full">
      <Banner />
    </Container>
  );
};

export default Home;
