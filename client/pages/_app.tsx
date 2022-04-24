import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import "../src/theme/styles.css";
import Layout from "../components/Layout";
import client from "../apollo-client";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider: ExternalProvider) => {
  const library = new Web3Provider(provider);
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
