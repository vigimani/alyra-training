const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Units tests of Bank smart contract", function () {
        let accounts;
        let spa;

        //get the accounts and the deployer
        before(async() => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
        })
        //test if deployment is ok
        describe("Deployment", function() {
            it("Should deploy the smart contract", async function() {
                await deployments.fixture(["spa"])
                spa = await ethers.getContract("Spa")
            })
        })

        describe("crud", function() {
            beforeEach(async() => {
                await deployments.fixture(["spa"])
                spa = await ethers.getContract("Spa")
            })
            
            it("should add an animal", async function() {
                let _race = "Doberman"
                let _size = "10"
                let _age = "15"
                expect(await spa.add(_race, _size, _age)).to.emit(
                    spa,
                    "animalAdded"
                )
                let x = await spa.getLisTofAnimals()
                expect(x.length).to.equal(1)
            })
            it("should get an animal", async function() {
                let _race = "Doberman"
                let _size = "10"
                let _age = "15"
                await spa.add(_race, _size, _age)
                let x = await spa.get(0)
                expect(x.race).to.equal(_race)
                expect(x.size).to.equal(_size)
                expect(x.age).to.equal(_age)
                expect(x.isAdopted).to.equal(false)
            })
            it("should NOT get an animal if not exist", async function() {
                await expect(spa.get(2)).to.be.revertedWith("Dog n'existe pas")
            })
            it("should NOT get an animal if deleted", async function() {
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
                await spa.remove(2)
                await expect(spa.get(2)).to.be.revertedWith("Dog already deleted")
            })
            it("should set an animal", async function() {
                await spa.add("Doberman", 10, 15)
                let set_race = "Dobe"
                let set_size = "15"
                let set_age = "20"
                await spa.set(0, set_race, set_size, set_age)
                let x = await spa.get(0)
                expect(x.race).to.equal(set_race)
                expect(x.size).to.equal(set_size)
                expect(x.age).to.equal(set_age)
            })
            it("should NOT set an animal if not exist", async function() {
                let set_race = "Dobe"
                let set_size = "15"
                let set_age = "20"
                await expect(spa.set(2, set_race, set_size, set_age)).to.be.revertedWith("Dog n'existe pas")
            })
            it("should NOT set an animal if deleted", async function() {
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
                await spa.remove(2)
                let set_race = "Dobe"
                let set_size = "15"
                let set_age = "20"
                await expect(spa.set(2, set_race, set_size, set_age)).to.be.revertedWith("Dog already deleted")
            })
            it("should remove an animal if exist ", async function() {
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
                await spa.remove(2)
                let x = await spa.getLisTofAnimals()
                expect(x[2].size).to.equal(0)
            })
            it("should NOT remove if not exist ", async function() {
                await expect(spa.remove(2)).to.be.revertedWith("Dog n'existe pas")
            })
            it("should NOT remove if already deleted ", async function() {
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
                await spa.remove(2)
                await expect(spa.remove(2)).to.be.revertedWith("Dog already deleted")
            })
        })

        describe("adopt", function() {
            beforeEach(async() => {
                await deployments.fixture(["spa"])
                spa = await ethers.getContract("Spa")
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
            })
            it("should adopt an animal", async function() {
                expect(await spa.adopt(1)).to.emit(
                    spa,
                    "animalAdopted"
                )
            })
            it("should NOT adopt an animal if already adopted", async function() {
                await spa.adopt(1)
                await expect(spa.adopt(1)).to.be.revertedWith("Animal already adopted")
            })
        })
        describe("get adoption ", function() {
            beforeEach(async() => {
                await deployments.fixture(["spa"])
                spa = await ethers.getContract("Spa")
                let _added_dogs = 3
                let n = 0
                while (n < _added_dogs) {
                    await spa.add("Doberman", 10-n, 15+n)
                    n += 1
                }
                await spa.adopt(1)
            })
            it("should return the adopted animal", async function() {
                let x = await spa.getAdoption(deployer.address)
                expect(x.race).to.equal("Doberman")
            })

        })
        // describe("Withdraw", function() {
        //     beforeEach(async() => {
        //         await deployments.fixture(["bank"])
        //         bank = await ethers.getContract("Bank")
        //         await bank.deposit({ value: 1000 })
        //         await bank.connect(accounts[1]).deposit({ value: 10000 })
        //     })

        //     it("should NOT withdraw if no ethers are on the smart contract for this address", async function() {
        //         await expect(bank.connect(accounts[2]).withdraw(1000)).to.be.revertedWith("Not enough funds")
        //     })

        //     it("should NOT withdraw if the account is trying to withdraw more ethers than what he deposited on the smart contract", async function() {
        //         await expect(bank.withdraw(1200)).to.be.revertedWith("Not enough funds")
        //     })

        //     it("should withdraw if enough ethers are deposited by this account on the smart contract", async function() {
        //         const balanceOfDeployer = await deployer.getBalance()
                
        //         // GAS COST
        //         const transactionResponse = await bank.withdraw(900)
        //         const transactionReceipt = await transactionResponse.wait()
        //         const { gasUsed, effectiveGasPrice } = transactionReceipt
        //         const gasCost = gasUsed.mul(effectiveGasPrice)
    
        //         let bn900 = ethers.BigNumber.from("900")
        //         let newBalanceOfDeployer = await deployer.getBalance()
    
        //         let result = balanceOfDeployer.add(bn900).sub(gasCost)
        //         assert.equal(result.toString(), newBalanceOfDeployer.toString())
    
        //         let account = await bank.getBalanceAndLastDeposit()
        //         assert(account.balance.toString() === "100");
        //         assert(account.lastDeposit.toString().length === 10)
        //     })

        //     it("should withdraw if enough ethers are deposited by this account on the smart contract and account not the owner", async function() {
        //         const balanceOfAccount1 = await accounts[1].getBalance()
                
        //         // GAS COST
        //         const transactionResponse = await bank.connect(accounts[1]).withdraw(10000)
        //         const transactionReceipt = await transactionResponse.wait()
        //         const { gasUsed, effectiveGasPrice } = transactionReceipt
        //         const gasCost = gasUsed.mul(effectiveGasPrice)
    
        //         let bn10000 = ethers.BigNumber.from("10000")
        //         let newBalanceOfAccount1 = await accounts[1].getBalance()
    
        //         let result = balanceOfAccount1.add(bn10000).sub(gasCost)
        //         assert.equal(result.toString(), newBalanceOfAccount1.toString())
    
        //         let account = await bank.connect(accounts[1]).getBalanceAndLastDeposit()
        //         assert(account.balance.toString() === "0");
        //         assert(account.lastDeposit.toString().length === 10)
        //     })
        // })

        // describe("Workflow status Tests", function() {
        //     before(async() => {
        //         await deployments.fixture(["bank"])
        //         bank = await ethers.getContract("Bank")
        //     })

        //     it("should deposit ethers on the smart contract if enough funds/ethers are deposited", async function() {
        //         //deployer deposits 1000 Wei
        //         await expect(await bank.deposit({ value: 1000 })).to.emit(
        //             bank,
        //             "etherDeposited"
        //         )
        //         let account = await bank.getBalanceAndLastDeposit()
        //         assert(account.balance.toString() === "1000");
        //         assert(account.lastDeposit.toString().length === 10)
        //     })

        //     it("should withdraw if enough ethers are deposited by this account on the smart contract", async function() {
        //         const balanceOfDeployer = await deployer.getBalance()
        //         //GAS COST
        //         const transactionResponse = await bank.withdraw(900)
        //         const transactionReceipt = await transactionResponse.wait()
        //         const { gasUsed, effectiveGasPrice } = transactionReceipt
        //         const gasCost = gasUsed.mul(effectiveGasPrice)
    
        //         let bn900 = ethers.BigNumber.from("900")
        //         let newBalanceOfDeployer = await deployer.getBalance()
    
        //         let result = balanceOfDeployer.add(bn900).sub(gasCost)
        //         assert.equal(result.toString(), newBalanceOfDeployer.toString())
    
        //         let account = await bank.getBalanceAndLastDeposit()
        //         assert(account.balance.toString() === "100");
        //         assert(account.lastDeposit.toString().length === 10)
        //     })
        // })


    })

        