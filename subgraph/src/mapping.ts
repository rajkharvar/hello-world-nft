import {
  MarketItemCreated,
  MarketItemSale,
  NFT,
  Transfer,
} from "../generated/NFT/NFT";
import { ZERO_ADDRESS } from "./utils";
import { NFT as NFTSchema } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: Transfer): void {
  // Minted NFT
  if (event.params.from == ZERO_ADDRESS) {
    const ID = event.params.tokenId.toString();
    const nft = new NFTSchema(ID);

    const contract = NFT.bind(event.address);

    const marketItem = contract.marketItems(event.params.tokenId);
    nft.tokenId = event.params.tokenId;
    nft.owner = event.params.to;
    nft.price = marketItem.value1;
    nft.onSale = marketItem.value2;
    nft.seller = event.params.from;
    nft.tokenURI = contract.tokenURI(event.params.tokenId);
    nft.save();
  } else {
    // This handles when someone tries to directly transfer NFT
    const ID = event.params.tokenId.toString();
    let nft = NFTSchema.load(ID);

    if (!nft) {
      nft = new NFTSchema(ID);
    }

    nft.owner = event.params.to;
    nft.save();
  }
}

export function handleMarketItemCreated(event: MarketItemCreated): void {
  const ID = event.params.tokenId.toString();
  let nft = NFTSchema.load(ID);

  if (!nft) {
    nft = new NFTSchema(ID);
  }

  nft.seller = event.params.seller;
  nft.price = event.params.price;
  nft.onSale = true;
  nft.save();
}

export function handleMarketItemSale(event: MarketItemSale): void {
  const ID = event.params.tokenId.toString();
  let nft = NFTSchema.load(ID);

  if (!nft) {
    nft = new NFTSchema(ID);
  }

  nft.onSale = false;
  nft.seller = event.params.seller;
  nft.price = new BigInt(0);

  nft.save();
}
