# Stocks.Exchange (Node JS API client)
Stocks.Exchange provides all the core exchange functionality, and additional merchant tools available via the HTTP API where all returned messages are in JSON. It's much easier to work with the API by using one of the clients provided by Stocks.Exchange, so while this page describes the API in case you want or need to build your own client, the examples use the Node JS client.
## Requirements
- Node.js
- npm (Node.js package manager)
## Dependent Libraries
- "crypto-js": "^3.1.9-1",
- "http-build-query": "^0.7.0",
- "pkg": "^4.3.3",
- "request": "^2.87.0"

## General
The base URL for all the requests other than public methods is 
```
https://app.stocks.exchange/api2
```

## Getting started
-[Documentation](http://help.stocks.exchange/api-integration).

To get started with the Node JS API client, here's a snippet for creating a client with existing credentials:
> In order to use the API functions, you must have an API key and API secret, which is generated in the user profile.

## Usage
```bash
npm install stocks-exchange-client
```

After install use for example this code!

### Example
```javascript
const stocks = require('stocks-exchange-client'),
    option = {
        api_key:'123456789',
        api_secret:'123456789'
    },
    se = new stocks.client(option);

    se.userInfo(function (res) {
        console.log(res);
    });

//Other methods
// ===================================================================================
// Use it to get the recommended retail exchange rates for all currency pairs.
se.ticker(function (res) {
    console.log(res);
});

// Get all available currencies with additional info.
se.currencies(function (res) {
    console.log(res);
});

// Get all available currency pairs with additional info.
se.markets(function (res) {
    console.log(res);
});

// Get currency pair with additional info.
// Params Currency1 and Currency2
se.marketSummary('BTC', 'USDT', function (res) {
    console.log(res);
});

// Use it to get the new retail exchange rates for all currency pairs.
se.prices(function (res) {
    console.log(res);
});

// Used to retrieve the latest trades that have occurred for a specific market. 
// Params Pair
se.tradeHistoryPub('BTC_USDT', function (res) {
    console.log(res);
});

// Used to get retrieve the orderbook for a given market.
// Params Pair
se.orderbook('BTC_USDT', function (res) {
    console.log(res);
});

// Get information about trade statistic
// Params: pair, count, order, interval, page, since, end
se.graficPublic({}, function (res) {
    console.log(res);
});

// Get information about your account.
se.userInfo(function (res) {
    console.log(res);
});

// Get information about active orders.
// Params: pair, count, order, type, owner, since, end
se.activeOrders({}, function (res) {
    console.log(res);
});

// Create orders for the purchase and sale.
// Params: type, pair, amount, rate
se.trade({}, function (res) {
    console.log(res);
});

// Cancel selected order.
// Params: order_id
se.cancelOrder(7610075, function (res) {
    console.log(res);
});

// Get information about all orders.
// Params: pair, count, order, status, owner, since, end
se.tradeHistory({}, function (res) {
    console.log(res);
});

// Get information about all closed orders from Register
// Params: currency, since, end
se.tradeRegisterHistory({}, function (res) {
    console.log(res);
});

// Get information about all orders User 
// Params: since, end
se.userHistory({}, function (res) {
    console.log(res);
});

// Get information about your deposits and withdrawals.
// Params: currency, count, order, operation, status
se.transHistory({}, function (res) {
    console.log(res);
});

// Get information about trade statistic.
// Params: currency, count, order, operation, status, since, end
se.grafic({}, function (res) {
    console.log(res);
});

// Generate currency wallet address.
// Params: currency
se.generateWallets('ONION', function (res) {
    console.log(res);
});

// Get information about your wallet to deposit funds.
// Params: currency
se.deposit('ONION', function (res) {
    console.log(res);
});

// Withdraw your funds.
// Params: currency, address, amount
se.withdraw('ONION', '123456890', '1.0', function (res) {
    console.log(res);
});

// Restore password (disable method)
// Params: email
se.remindPassword('test@gmail.com', function (res) {
    console.log(res);
});
```
## Common Errors
### Here is a list with common errors and their descriptions:
  1.    Invalid Key - not generated key or the key does not correspond to the a user
  2.    Invalid Sign - bad hash-code
  3.    Invalid Nonce - wrong or empty parameter Nonce
  4.    Duplicate Request - parameter Nonce is not unique
  5.    Invalid Method - this method is wrong or missing 
  6.    The credentials are invalid - not valid Api Key or Sign  	
