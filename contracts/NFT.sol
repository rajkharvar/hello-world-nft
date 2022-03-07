pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  mapping(uint => bool) public NFTsSold;
  uint public listingPrice  = 0.1 ether;

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

  function setListingPrice(uint _listingPrice) public onlyOwner {
    listingPrice = _listingPrice;
  }

  function mintNFT(string memory _tokenURI) public onlyOwner {
    _tokenIds.increment();

    uint256 newTokenId = _tokenIds.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
  }

  function transferNFT(uint _tokenId) public payable {
    require(!NFTsSold[_tokenId], "This NFT is already sold");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    NFTsSold[_tokenId] = true;
    safeTransferFrom(address(this), msg.sender, _tokenId);
  }
  
  function withdraw() public onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }
}