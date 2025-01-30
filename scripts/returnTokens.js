const hre = require("hardhat");

async function main() {
    const [owner, addr1] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x824E23428e5C3b2c46360b0A4DAfaCf36A0BdCA2"); // Адрес развернутого контракта

    const amount = hre.ethers.utils.parseUnits("100", 18); // 100 токенов
    const recipient = addr1.address;

    // Возврат токенов
    const tokenFromAddr1 = token.connect(addr1);
    const tx = await tokenFromAddr1.transfer(owner.address, amount);
    await tx.wait();

    console.log(`Successfully returned 100 tokens from ${recipient} to ${owner.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
