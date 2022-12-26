# Test module for Voting contract - projet 2 Alyra

The purpose of this doc is to test the solidity contract Voting.sol and its deployment. 

## Table of Contents
1. Explanation on tests realized
2. Test coverage : yarn hardhat coverage

### General Info
1. Explanation on tests realized


***
```
@vote-deployment.test.js
      File that tests if the contract is correctly deployed 
              ✔ should deploy the smart contract
```
```
vote-add.test.js
      File that tests the following functions :
        addVoter:
              ✔ should add a voter if owner and correct workflow status
              ✔ should beRegistered if addVoter (40ms)
              ✔ should emit an event if addVoter
              ✔ should NOT addVoter if incorrect worflow status (147ms)
              ✔ should NOT addVoter if not the owner

        addProposal : 
              ✔ should NOT addProposal if incorrect workflow status (118ms)
              ✔ should NOT addProposal if not a Voter
              ✔ should emit event addProposal if Voter and correct worflow status (42ms)
              ✔ should addProposal if Voter and correct worflow status(51ms)
              ✔ should be possible to add multiple Proposal if Voter (66ms)

        setVote: 
              ✔ should NOT setVote if incorrect workflow status (88ms)
              ✔ should NOT setVote if not a Voter (58ms)
              ✔ should NOT setVote if already voted - same proposal vote (73ms)
              ✔ should NOT setVote if already voted - other proposal vote (87ms)
              ✔ should NOT setVote if no proposal exists (38ms)
              ✔ should setVote for a proposal done by someone else if Voter and correct workflow status
              ✔ should emit event setVote if success
              ✔ should be possible to vote even if the Voter has not done any proposal

        tallyVotes : 
              ✔ should NOT work if not votingSessionEnded
              ✔ should NOT work if not Owner (44ms)
              ✔ if no Proposal (function returns 0 if no proposition and no vote)
              ✔ should emit an event if success
              ✔ should return the correct Proposal
```
```
vote-get.test.js
      File that tests the following functions :
        getVoter : 
              ✔ should NOT give voter if not called by a Voter
              ✔ should give voter if Voter
        getOneProposal :
              ✔ should NOT give proposal if not called by a Voter
              ✔ should NOT give Proposal if no id proposal found
              ✔ should give Proposal if proposal added and called from Voter
              ✔ should give Proposal no matter the workflow (113ms)

├── vote-states.test.js
      File that tests states and workflow status :
            Only Owner can change state
              ✔ should NOT start Proposal registering if NOT the owner
              ✔ should NOT end Proposal registering if NOT the owner
              ✔ should NOT start voting session if NOT the owner
              ✔ should NOT end voting session if NOT the owner
              ✔ should NOT launch tallyVotes if NOT the owner
            Check each steap of Workflows
              ✔ should start Proposal registering if the owner
              ✔ should end Proposal registering if the owner
              ✔ should start voting session if the owner
              ✔ should end voting session if the owner
              ✔ should launch tallyVotes if the owner
            check change Workflows if wrong previous status
              ✔ should NOT start Proposal registering if incorrect WF (51ms)
              ✔ should NOT end Proposal registering if incorrect WF (53ms)
              ✔ should NOT start voting session in incorrect WF (48ms)
              ✔ should NOT end voting session if incorrect WF (58ms)
              ✔ should NOT launch tallyVotes (71ms)
```

3. Test coverage : yarn hardhat coverage 

File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |      100 |    95.83 |      100 |      100 |                |
  Voting.sol |      100 |    95.83 |      100 |      100 |                |
All files    |      100 |    95.83 |      100 |      100 |                |



