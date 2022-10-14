//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ChickenSpinNFT is ERC721Enumerable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 currentTokenId = 0;
    uint256 amountPerDay = 5;
    uint256 startTime;
    uint256 releasePeriod = 300;
    uint256 public currentMintedAmountPerDay = 0;
    uint256 price = 0;
    address private admin;

    mapping(uint256 => string) private baseURI;
    mapping(uint256 => bool) private completed;

    constructor(address _admin) ERC721("CheckenNFT", "CHK") {
         _setupRole(ADMIN_ROLE, _admin);
         startTime = block.timestamp;
    }

    event Minted(address indexed minter, uint256 tokenId);
    event SetBaseUri(uint256 tokenId, string baseUri);

    function _increseTokenId() internal {
        currentTokenId += 1;
    }

    function _increaseAmountPerDay() internal {
        currentMintedAmountPerDay += 1;
    }

    function _resetAmountPerDay() internal {
        currentMintedAmountPerDay = 0;
    }

    function _setNewNextMint() internal {
        startTime = block.timestamp + releasePeriod;
    }

    function getCurrentTokenId() public view returns(uint256) {
        return currentTokenId + 1;
    }

    function getStartTime() public view returns(uint256) {
        return startTime;
    }

    function mint() public {
        require(block.timestamp > startTime, 'not open yet!');

        uint256 tokenId = getCurrentTokenId();
        emit Minted(msg.sender, tokenId);
        _safeMint(msg.sender, tokenId);

        if(currentMintedAmountPerDay < amountPerDay - 1) {
            _increaseAmountPerDay();
        } else {
            _setNewNextMint();
            _resetAmountPerDay();
        }

        _increseTokenId();
    }

    function setBaseUri(uint256 _tokenId, string memory _baseUri) public {
        require(hasRole(ADMIN_ROLE, msg.sender), 'only admin');
        require(!completed[_tokenId], 'uri has already set');
        completed[_tokenId] = true;
        baseURI[_tokenId] = _baseUri;

        emit SetBaseUri(_tokenId, _baseUri);
    }
    
    function setAmountPerDay(uint256 _newAmount) public {
        require(hasRole(ADMIN_ROLE, msg.sender), 'only admin');
        require(_newAmount > 0, 'invalid amount');
        amountPerDay = _newAmount;
    }

    function setReleasePeriod(uint256 _newPeriod) public {
        require(hasRole(ADMIN_ROLE, msg.sender), 'only admin');
        require(_newPeriod > 300, 'invalid period');
        releasePeriod = _newPeriod;
    }

    function setPrice(uint256 _newPrice) public {
        require(hasRole(ADMIN_ROLE, msg.sender), 'only admin');
        require(_newPrice > 0, 'invalid price');
        price = _newPrice;
    }
    
    function tokenURI(uint256 _tokenId) public view override returns(string memory) {
        require(_exists(_tokenId), 'token does not existed!');
        require(completed[_tokenId], 'token does not existed!');
        return baseURI[_tokenId];      
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}