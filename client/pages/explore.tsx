import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { FETCH_NFTS } from "../utils/queries";

const Explore: NextPage = () => {
  const { data, loading } = useQuery(FETCH_NFTS);

  useEffect(() => {
    console.log("loading");
    console.log(loading);

    console.log("data");
    console.log(data);
  }, [data, loading]);

  return <Heading>Explore</Heading>;
};

export default Explore;
