import Navbar from "./Navbar";
import * as React from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Hello World NFT</title>
      </Head>
      <Container maxW="100vw" minH="100vh" m={0} p={0}>
        <Navbar />
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
