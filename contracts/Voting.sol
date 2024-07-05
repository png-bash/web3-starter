// SPDX-License-Identifier: GLWTPL
pragma solidity >= 0.8.0;

contract Voting {

    struct Campaign {
        string name;
        string description;
        uint256 deadline;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => bool)) public votes;

    function createCampaign(uint256 _id, string memory _name, string memory _description, uint256 _deadline) public {
        campaigns[_id] = Campaign(_name, _description, _deadline);
    }

    function vote(uint256 _id, bool _vote) public {
        require(block.timestamp < campaigns[_id].deadline, "Voting is closed");
        votes[_id][msg.sender] = _vote;
    }

    function hasVoted(uint256 _id) public view returns (bool) {
        return votes[_id][msg.sender];
    }

    function getCampaign(uint256 _id) public view returns (string memory, string memory, uint256) {
        return (campaigns[_id].name, campaigns[_id].description, campaigns[_id].deadline);
    }

    function getVote(uint256 _id) public view returns (bool) {
        return votes[_id][msg.sender];
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory _campaigns = new Campaign[](1);
        for (uint256 i = 0; i < 1; i++) {
            _campaigns[i] = campaigns[i];
        }
        return _campaigns;
    }
}

