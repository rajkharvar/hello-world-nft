import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
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

  it("Only admin can mint NFT", async () => {
    nft = nft.connect(signers[1]);

    await expect(
      nft.mintNFT("https://jsonplaceholder.typicode.com/todos/1")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Market item should be created on minting NFT", async () => {
    nft = nft.connect(signers[0]);
    await nft.mintNFT("https://jsonplaceholder.typicode.com/todos/1");

    const tokenId = await nft._tokenIds();
    const { seller, price, onSale } = await nft.marketItems(tokenId);
    const listingPrice = await nft.listingPrice();

    expect(seller).to.be.equal(nft.address);
    expect(price).to.be.equal(listingPrice);
    expect(onSale).to.be.equal(true);
  });

  it("Transaction should be reverted when price != bid price", async () => {
    nft = nft.connect(signers[1]);

    await expect(
      nft.createMarketSale(BigNumber.from(1), {
        value: ethers.utils.parseEther("0.11"),
      })
    ).to.be.revertedWith("Invalid bid price");
  });

  it("On successful market sale seller should get bid price", async () => {
    const { seller, price } = await nft.marketItems(BigNumber.from(1));
    const provider = waffle.provider;
    const sellerPrevBalance = await provider.getBalance(seller);

    await nft.createMarketSale(BigNumber.from(1), {
      value: price,
    });

    const sellerNextBalance = await provider.getBalance(seller);

    expect(sellerNextBalance.sub(sellerPrevBalance)).to.be.equal(price);
  });

  it("On successful market sale owner should be changed", async () => {
    await nft.createMarketItem(
      BigNumber.from(1),
      ethers.utils.parseEther("0.1")
    );

    nft = nft.connect(signers[0]);
    await nft.createMarketSale(BigNumber.from(1), {
      value: ethers.utils.parseEther("0.1"),
    });

    const newOwner = await nft.ownerOf(BigNumber.from(1));
    expect(newOwner).to.be.equal(signers[0].address);
  });
});
