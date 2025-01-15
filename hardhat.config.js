require("@nomiclabs/hardhat-ethers");

module.exports = {
    defaultNetwork: "ganache",
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            accounts: ["0x9d4360f789dfdddcbd46ae7438c98afd331f4be082a1eed6efa10af3ebb149b0", "0xb5e024e6b0abd1a3be56c38602074edfe20614b4b72675bae8fc5ba1fea4b4e8"] // Укажите приватный ключ из Ganache
        }
    },
    solidity: {
        version: "0.8.20", // Обновите до 0.8.20
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
