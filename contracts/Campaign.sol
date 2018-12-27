pragma solidity >=0.4.22 <0.6.0;

contract Campaign {

    struct Request {
        string description;
        uint amount;
        address recipient;
        bool complete;
        mapping (address => bool) approvals;
        uint approvalCount;
        uint totalCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping (address => uint) public approvers;
    Request[] public requests;

    modifier restrictedToManager() {
        require(manager == msg.sender, "Permision denied");

        _;
    }

    constructor(uint _contribution) public {
        manager = msg.sender;
        minimumContribution = _contribution * 1 ether;
    }

    function contribute() public payable {
        require(manager != msg.sender, "You cannot contribute in your own campaign.");
        require(msg.value >= minimumContribution, "Not enough money.");
        require(approvers[msg.sender] == 0, "Already contributed"); 
        approvers[msg.sender] = msg.value;
    }

    function createRequest(string memory _description, uint _amount, address _recipient) public restrictedToManager {
        Request memory newRequest = Request({
            description: _description,
            amount: _amount,
            recipient: _recipient,
            complete: false,
            approvalCount: 0,
            totalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint _index, bool _vote) public {
        require(approvers[msg.sender] != 0, "No contributed");
        require(!requests[_index].approvals[msg.sender], "Already voted");
        requests[_index].approvals[msg.sender] = _vote;
        requests[_index].totalCount++;
        if(_vote){
            requests[_index].approvalCount++;
        }

        if(requests[_index].totalCount / 2 < requests[_index].approvalCount){
            requests[_index].complete = true;
        }
    }

    function finalizeRequest(uint _index) public restrictedToManager {
        require(requests[_index].complete, "Already finished");
        address(uint160(requests[_index].recipient)).transfer(address(this).balance);
    }
 
}