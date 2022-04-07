import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { NFT } from "../typechain";

describe("NFT", async () => {
  const name: string = "Hello World";
  const symbol: string = "HW";
  let nft: NFT;
  let signers: SignerWithAddress[];

  before(async () => {
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(name, symbol);

    signers = await ethers.getSigners();
  });

  it("Name and symbol should be match with deployed NFT contract", async () => {
    expect(await nft.name()).be.equal(name);
    expect(await nft.symbol()).be.equal(symbol);
  });

  it("Only owner can mint NFT", async () => {
    nft = nft.connect(signers[1]);

    await expect(
      nft.mintNFT("https://jsonplaceholder.typicode.com/todos/1")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
