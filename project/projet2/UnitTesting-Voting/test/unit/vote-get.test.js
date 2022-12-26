const { assert, expect, expectRevert, withNamedArgs } = require("chai")
const { network, deployments, ethers } = require("hardhat");
const { BN } = require('@openzeppelin/test-helpers');
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Unit test on getter function", function () {
        let accounts;
        let vote;

        before(async() => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
        })

        describe("getVoter", function() {
            beforeEach(async function () {
                await deployments.fixture(["voting"])
                vote = await ethers.getContract("Voting")
            })
            it("should NOT give voter if not Voter", async function() {
                await expect(vote.getVoter(accounts[0].address)).to.be.revertedWith("You're not a voter")
            })
            it("should give voter if Voter", async function() {
                await vote.addVoter(accounts[1].address)
                let x = await vote.connect(accounts[1]).getVoter(accounts[0].address)
                let y = await vote.connect(accounts[1]).getVoter(accounts[1].address)
                await expect(x.isRegistered).to.equal(false)
                await expect(y.isRegistered).to.equal(true)
            })
        })

        describe("getOneProposal", function() {
            beforeEach(async function () {
                await deployments.fixture(["voting"])
                vote = await ethers.getContract("Voting")
            })
            it("should NOT give proposal if not Voter", async function() {
                await vote.addVoter(accounts[1].address)
                await vote.startProposalsRegistering()
                await vote.connect(accounts[1]).addProposal("Proposal numero 0")
                await expect(vote.getOneProposal(1)).to.be.revertedWith("You're not a voter")
            })
            it("should NOT give Proposal if no id proposal found", async function() {
                await vote.addVoter(accounts[1].address)
                await vote.startProposalsRegistering()
                await expect(vote.connect(accounts[1]).getOneProposal(3)).to.be.revertedWithPanic()
            })
            it("should give Proposal if proposal added and from Voter", async function() {
                await vote.addVoter(accounts[1].address)
                await vote.startProposalsRegistering()
                await vote.connect(accounts[1]).addProposal("Proposal numero 0")
                let x = await vote.connect(accounts[1]).getOneProposal(1)
                await expect(x.description).to.be.equal("Proposal numero 0")
            })
            it("should give Proposal no matter the workflow", async function() {
                await vote.addVoter(accounts[1].address)
                await vote.startProposalsRegistering()
                await vote.connect(accounts[1]).addProposal("Proposal numero 0")
                await vote.endProposalsRegistering()
                await expect((await vote.connect(accounts[1]).getOneProposal(1)).description).to.be.equal("Proposal numero 0")
                await vote.startVotingSession()
                await expect((await vote.connect(accounts[1]).getOneProposal(1)).description).to.be.equal("Proposal numero 0")
                await vote.endVotingSession()
                await expect((await vote.connect(accounts[1]).getOneProposal(1)).description).to.be.equal("Proposal numero 0")
                await vote.tallyVotes()
                await expect((await vote.connect(accounts[1]).getOneProposal(1)).description).to.be.equal("Proposal numero 0")
            })
        })
        
    })