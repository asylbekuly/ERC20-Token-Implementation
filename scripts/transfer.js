const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x4Ebb33Fc18eEf4B48fFc6a4956B023c67cF79928"); // Адрес развернутого контракта

    const recipient = "0x5D2Ac79D50e3677557788b600014f22929AC8ef8"; // Замените на адрес получателя
    const amount = hre.ethers.utils.parseUnits("100", 18); // 100 токенов

    // Выполнить перевод
    const tx = await token.transfer(recipient, amount);
    await tx.wait();

    console.log(`Successfully transferred 100 tokens to ${recipient}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
