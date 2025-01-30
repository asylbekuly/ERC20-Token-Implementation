const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstanaItUniversity_SE2314", function () {
    let Token, token, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const initialMintValue = 5000;  // Specify the amount of tokens to mint
        Token = await ethers.getContractFactory("AstanaItUniversity_SE2314");
        token = await Token.deploy(initialMintValue);
        await token.deployed();
    });

    it("Should mint the specified amount of tokens to the owner", async function () {
        const balance = await token.balanceOf(owner.address);
        // Проверка без использования формата
        expect(balance.toString()).to.equal(ethers.utils.parseUnits("5000", 18).toString());
    });
    

    it("Should transfer tokens to addr1", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount);
        
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("100.0");

        const ownerBalance = await token.balanceOf(owner.address);
        expect(ethers.utils.formatUnits(ownerBalance, 18)).to.equal("4900.0");
    });

    it("Should return the correct initial mint value", async function () {
        const initialMintValue = 5000;
        const value = await token.getInitialMintValue();
        expect(value.toString()).to.equal(initialMintValue.toString());
    });

    it("Should return the correct timestamp after a transfer", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        const tx = await token.transfer(addr1.address, transferAmount);
        const receipt = await tx.wait();
        
        const contractTimestamp = await token.getTransactionTimestamp();
        const blockTimestamp = (await ethers.provider.getBlock(receipt.blockNumber)).timestamp;

        const [day, month, year] = contractTimestamp.split("-");
        const expectedDate = new Date(blockTimestamp * 1000);

        expect(parseInt(day)).to.equal(expectedDate.getUTCDate());
        expect(parseInt(month)).to.equal(expectedDate.getUTCMonth() + 1);
        expect(parseInt(year)).to.equal(expectedDate.getUTCFullYear());
    });

    it("Should return the correct sender and receiver of transactions", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount);
        
        const sender = await token.getTransactionSender();
        const receiver = await token.getTransactionReceiver();
        
        expect(sender).to.equal(owner.address);
        expect(receiver).to.equal(addr1.address);
    });

    it("Should return the correct transaction details by index", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount);
        const [sender, receiver, amount] = await token.getTransaction(0);
        expect(sender).to.equal(owner.address);
        expect(receiver).to.equal(addr1.address);
        expect(amount.toString()).to.equal(transferAmount.toString());
    });
});
