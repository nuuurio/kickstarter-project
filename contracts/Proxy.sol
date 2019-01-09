pragma solidity >=0.4.22 <0.6.0;

contract Proxy {
    address public campaignAddress;
    address public manager;

    modifier restrictedToManager() {
        require(manager == msg.sender, "Permission denied");

        _;
    }

    constructor(address _address) public {
        campaignAddress = _address;
        manager = msg.sender;
    }

    function getProxyAddress() public view returns (address){
        return campaignAddress;
    }

    function setProxyAddress(address _newAddress) public restrictedToManager {
        campaignAddress = _newAddress;
    }
}