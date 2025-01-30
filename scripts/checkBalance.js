async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("AstanaItUniversity_SE2314");
    const token = await Token.attach("0x824E23428e5C3b2c46360b0A4DAfaCf36A0BdCA2"); // Укажите адрес развернутого контракта
  
    // Получаем баланс владельца
    const balance = await token.balanceOf(deployer.address);
    console.log("Owner balance:", ethers.utils.formatUnits(balance, 18));
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  