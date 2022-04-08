import { NFT, Transfer } from "../generated/NFT/NFT";
import { ZERO_ADDRESS } from "./utils";
import { NFT as NFTSchema } from "../generated/schema";

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

    nft.save();
  }
}
