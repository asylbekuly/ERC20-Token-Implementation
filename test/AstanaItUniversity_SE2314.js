const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstanaItUniversity_SE2314", function () {
    let Token, token, owner, addr1;

    beforeEach(async function () {
        const signers = await ethers.getSigners();
        
        // Убедимся, что есть как минимум два аккаунта
        if (signers.length < 2) {
            throw new Error("Not enough accounts in the network");
        }

        [owner, addr1] = signers;

        Token = await ethers.getContractFactory("AstanaItUniversity_SE2314");
        token = await Token.deploy();
        await token.deployed();
    });

    it("Should mint 2000 tokens to owner", async function () {
        const balance = await token.balanceOf(owner.address);
        expect(ethers.utils.formatUnits(balance, 18)).to.equal("2000.0");
    });

    it("Should transfer tokens to addr1", async function () {
        const transferAmount = ethers.utils.parseUnits("100", 18);
        await token.transfer(addr1.address, transferAmount);
        
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("100.0");

        const ownerBalance = await token.balanceOf(owner.address);
        expect(ethers.utils.formatUnits(ownerBalance, 18)).to.equal("1900.0");
    });
});
