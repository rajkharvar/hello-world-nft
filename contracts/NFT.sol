pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
}