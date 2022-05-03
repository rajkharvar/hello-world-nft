import { gql } from "@apollo/client";

const FETCH_NFTS = gql`
  query {
    nfts(orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      owner
      onSale
      price
      seller
      tokenURI
    }
  }
`;

const FETCH_NFT = gql`
  query ($id: String!) {
    nft(id: $id) {
      id
      tokenId
      owner
      onSale
      price
      seller
      tokenURI
    }
  }
`;

const FETCH_USER_NFTS = gql`
  query ($owner: String!) {
    nfts(where: { owner: $owner }) {
      id
      tokenId
      owner
      onSale
      price
      seller
      tokenURI
    }
  }
`;

export { FETCH_NFTS, FETCH_NFT, FETCH_USER_NFTS };
