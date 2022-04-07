import { ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("HelloWorld", "HW");
  await nft.deployed();

  console.log("NFT contract deployed successfully!");
  console.log("NFT contract address:", nft.address);

  const owner = await nft.owner();
  console.log("owner:", owner);

  await nft.mintNFT(
    "https://ipfs.infura.io/ipfs/QmbsMrfTenjgkmn99WSpa7NsiP2vjaLtqvrzwaYoie9dPJ"
  );

  const tokenIds = await nft._tokenIds();
  console.log("tokenIds:", tokenIds);
}

main().catch((error) => {
  console.log(error);
});
