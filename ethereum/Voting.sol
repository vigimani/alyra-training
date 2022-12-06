// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable{

    uint propalId;
    uint winningProposalId;

    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    struct Proposal {
        string description;
        uint voteCount;
    }

    mapping(address => Voter) user;
    mapping(uint => Proposal) propId;

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    WorkflowStatus public status;

/// Admin du vote enregistre une liste blanche identifiées par leur adresse Eth
    function voterRegistration(address[] memory _listaddress) public onlyOwner {
        status = WorkflowStatus.RegisteringVoters;
        for (uint i=0; i < _listaddress.length;i++){
            user[_listaddress[i]].isRegistered = true;
            emit VoterRegistered(_listaddress[i]);
        }
    }

/// Admin commence la session d'enregistrement des propositions
    function openProposalsReg() public onlyOwner {status = WorkflowStatus.ProposalsRegistrationStarted;}

/// Les électeurs inscrits sont autorisés à enregistrer leurs propositions
    function makeProposal(string memory _desc) public {
        require(user[msg.sender].isRegistered, "you are not registered yet");
        require(status == WorkflowStatus.ProposalsRegistrationStarted, "Proposals registration not yet started or finished");
        Proposal memory propal = Proposal(_desc, 0);
        propId[propalId] = propal;
        user[msg.sender].hasVoted = true;
        user[msg.sender].votedProposalId = propalId;
        propalId ++;
        emit ProposalRegistered(propalId);
    }

// Admin met fin à la session d'enregistrement des propositions et lance la session de vote
    function closeProposalsReg() public onlyOwner {status = WorkflowStatus.ProposalsRegistrationEnded;}
    function openVoting() public onlyOwner {status = WorkflowStatus.VotingSessionStarted;}

// Les électeurs insrits votent pour leur proposition préférée
    function vote(uint _propalId) public {
        require(status == WorkflowStatus.VotingSessionStarted, "Voted registration not yet started or finished");
        require(user[msg.sender].isRegistered, "you are not registered yet");
        require(!user[msg.sender].hasVoted, "you have already voted");
        propId[_propalId].voteCount++;
        if (propId[_propalId].voteCount >= propId[winningProposalId].voteCount){
            winningProposalId = _propalId;}
        user[msg.sender].hasVoted = true;
        user[msg.sender].votedProposalId =_propalId;
        emit Voted(msg.sender, _propalId);
    }

// Admin met fin à la session de vote
    function closeVoting() public onlyOwner {status = WorkflowStatus.VotingSessionEnded;}

// Admin compte les votes
    function votesTailling() public onlyOwner {status = WorkflowStatus.VotesTallied;}

// Get results and vote of users
    function winningProposal() public returns(string memory, uint){
        return(propId[winningProposalId].description, propId[winningProposalId].voteCount);
    }

    function getVoteOfUser(address _addr) public view returns(string memory){
        require(user[_addr].hasVoted, "not voted yet");
        return propId[user[_addr].votedProposalId].description;
    }


}