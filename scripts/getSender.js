const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x824E23428e5C3b2c46360b0A4DAfaCf36A0BdCA2"); // Убедитесь, что используете правильный адрес контракта

    const sender = await token.getTransactionSender();
    console.log("Sender address:", sender);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
