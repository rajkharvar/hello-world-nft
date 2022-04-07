pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  uint public listingPrice  = 0.1 ether;

  struct MarketItem {
    address payable seller;
    uint256 price;
    bool onSale;
  }

  mapping(uint256 => MarketItem) public marketItems;

  event MarketItemCreated(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 price
  );

  event MarketItemSale(
    uint256 indexed tokenId,
    address indexed seller,
    address indexed owner
  );

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

  /// @notice Update listingPrice of NFT that will be minted
  /// @dev Only owner can update listingPrice
  /// @param _listingPrice new listing price
  function setListingPrice(uint _listingPrice) public onlyOwner {
    listingPrice = _listingPrice;
  }

  /// @notice Mint NFT
  /// @dev Only owner can mint NFT
  function mintNFT(string memory _tokenURI) public onlyOwner {
    _tokenIds.increment();

    uint256 newTokenId = _tokenIds.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);

    marketItems[newTokenId] = MarketItem(
      payable(address(this)),
      listingPrice,
      true
    );
  }

  /// @notice NFT owner can create market item for sale
  /// @dev NFT ownership would be transferred to contract address
  /// @param _tokenId NFT tokenId
  /// @param _price bid price
  function createMarketItem(uint _tokenId, uint256 _price) public {
    require(ownerOf(_tokenId) == msg.sender, "Only owner of NFT can create sale");
    
    marketItems[_tokenId] = MarketItem(
      payable(msg.sender),
      _price,
      true
    );

    IERC721(address(this)).safeTransferFrom(msg.sender, address(this), _tokenId);

    emit MarketItemCreated(_tokenId, msg.sender, _price);
  }

  /// @notice User can create market sale by paying the bid price of NFT
  /// @dev Ownership of NFT is transferred from contract address to user
  /// @param _tokenId NFT tokenId
  function createMarketSale(uint256 _tokenId) public payable {
    require(marketItems[_tokenId].price == msg.value, "Invalid bid price");

    marketItems[_tokenId].seller.transfer(msg.value);

    IERC721(address(this)).transferFrom(address(this), msg.sender, _tokenId);

    emit MarketItemSale(_tokenId, marketItems[_tokenId].seller, msg.sender);

    marketItems[_tokenId] = MarketItem(
      payable(address(0)),
      0,
      false
    );

  }

  /// @notice withdraw funds from contract
  /// @dev only owner can withdraw funds
  function withdraw() public onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }
}