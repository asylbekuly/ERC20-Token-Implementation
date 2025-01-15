AstanaItUniversity_SE2314
Описание
Это смарт-контракт, реализующий токен стандарта ERC-20 с названием AstanaItUniversity_SE2314. Контракт включает дополнительные функции для получения и отображения информации о транзакциях.

Функциональность
Инициализация:
Контракт создаёт 2000 токенов при развертывании, которые назначаются создателю контракта.

Особенности:

Получение информации о транзакциях:
Адрес отправителя.
Адрес получателя.
Временная метка последней транзакции.
Логирование транзакций:
Каждая транзакция записывается в событие.
Технические требования
Среда разработки:
Hardhat

Язык программирования:
Solidity ^0.8.20

Библиотеки и зависимости:

@openzeppelin/contracts
hardhat
@nomiclabs/hardhat-ethers
chai
ethers
Установка
Склонируйте репозиторий:



git clone https://github.com/your-repository.git
cd your-repository
Установите зависимости:

npm install
Убедитесь, что Ganache или другая локальная сеть запущена.

Развертывание контракта
Создайте и настройте файл hardhat.config.js, указав сеть и ключи.
Разверните контракт:

npx hardhat run scripts/deploy.js --network ganache
Тестирование
Запустите юнит-тесты:


npx hardhat test
Использование
Перевод токенов:
Включите функционал перевода:

await token.transfer("0xRecipientAddress", amount);
Получение информации:
Временная метка последней транзакции:


const timestamp = await token.getTransactionTimestamp();
console.log("Timestamp:", timestamp);
Адрес отправителя:

const sender = await token.getTransactionSender();
console.log("Sender address:", sender);
Адрес получателя:

const receiver = await token.getTransactionReceiver();
console.log("Receiver address:", receiver);