import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/106868/hello-world-nft/version/latest",
  cache: new InMemoryCache(),
});

export default client;
