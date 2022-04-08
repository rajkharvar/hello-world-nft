import { ethers } from "hardhat";
import { create } from "ipfs-http-client";
import fs from "fs";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

const NFT_CONTRACT: string = "0x179248E4Ae3531A24589517C0E0123AB83cD64B5";

async function uploadFile() {
  try {
    const file = fs.readFileSync("assets/js.png");
    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log("Image URL:", url);
    return url;
  } catch (error) {
    console.log("Error occured while uploading file");
  }
}

async function uploadMetadata() {
  try {
    const imageURL = await uploadFile();

    const data = JSON.stringify({
      title: "Javascript",
      description: "Hello World in Javascript",
      image: imageURL,
    });

    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log("Error occured while uploading file");
    return "";
  }
}

async function main() {
  const tokenURI = await uploadMetadata();
  console.log("Token URL:", tokenURI);

  const NFT = ethers.getContractFactory("NFT");
  const nft = (await NFT).attach(NFT_CONTRACT);

  const tx = await nft.mintNFT(tokenURI);
  await tx.wait();

  const tokenIds = await nft._tokenIds();
  console.log("tokenIds: ", tokenIds);
}

main().catch((error) => {
  console.log(error);
});
