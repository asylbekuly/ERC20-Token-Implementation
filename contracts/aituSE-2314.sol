// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AstanaItUniversity_SE2314 is ERC20 {
    // Событие для логирования информации о транзакции
    event TransactionDetails(address indexed sender, address indexed receiver, uint256 amount, uint256 timestamp);

    // Структура для хранения информации о транзакции
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }

    // Массив для хранения всех транзакций
    Transaction[] private transactions;

    // Последняя временная метка и получатель
    uint256 private lastTimestamp;
    address private lastReceiver;

    // Конструктор для инициализации токенов
    constructor() ERC20("AstanaItUniversity_SE2314", "AIU2314") {
        _mint(msg.sender, 2000 * 10 ** decimals()); // Выпуск 2000 токенов
    }

    // Переопределение функции transfer для логирования транзакций
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        lastTimestamp = block.timestamp; // Сохраняем временную метку
        lastReceiver = recipient; // Сохраняем адрес получателя

        bool success = super.transfer(recipient, amount);
        if (success) {
            transactions.push(Transaction(msg.sender, recipient, amount, block.timestamp));
            emit TransactionDetails(msg.sender, recipient, amount, block.timestamp);
        }
        return success;
    }

    // Получение информации о временной метке последней транзакции в читаемом формате
    function getTransactionTimestamp() public view returns (string memory) {
        require(lastTimestamp != 0, "No transactions yet");
        return _timestampToString(lastTimestamp);
    }

    // Получение адреса отправителя последней транзакции
    function getTransactionSender() public view returns (address) {
        require(transactions.length > 0, "No transactions yet");
        return transactions[transactions.length - 1].sender;
    }

    // Получение адреса получателя последней транзакции
    function getTransactionReceiver() public view returns (address) {
        require(lastReceiver != address(0), "No transactions yet");
        return lastReceiver;
    }

    // Получение информации о транзакции по индексу
    function getTransaction(uint256 index) public view returns (address, address, uint256, uint256) {
        require(index < transactions.length, "Transaction does not exist");
        Transaction memory txn = transactions[index];
        return (txn.sender, txn.receiver, txn.amount, txn.timestamp);
    }

    // Вспомогательная функция для преобразования временной метки в строку
    function _timestampToString(uint256 timestamp) internal pure returns (string memory) {
        uint256 day = (timestamp / 86400) % 31 + 1; // Упрощенный расчет дня
        uint256 month = (timestamp / 2592000) % 12 + 1; // Упрощенный расчет месяца
        uint256 year = (timestamp / 31536000) + 1970; // Упрощенный расчет года
        return string(abi.encodePacked(uint2str(day), "-", uint2str(month), "-", uint2str(year)));
    }

    // Вспомогательная функция для преобразования uint в строку
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
