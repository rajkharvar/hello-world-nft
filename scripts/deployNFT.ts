import { ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("HelloWorld", "HW");
  await nft.deployed();

  console.log("NFT contract deployed successfully!");
  console.log("NFT contract address:", nft.address);

  const owner = await nft.owner();
  console.log("owner:", owner);

  let txn = await nft.mintNFT(
    "https://media.giphy.com/media/1gbqIc1fK8QgR3bHL7/giphy.gif"
  );

  const tokenIds = await nft._tokenIds();
  console.log("tokenIds:", tokenIds);
}

main().catch((error) => {
  console.log(error);
});
