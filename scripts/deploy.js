async function main() {
    const Token = await ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.deploy(ethers.utils.parseUnits("2000", 18)); // 2000 токенов с 18 знаками после запятой

    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
