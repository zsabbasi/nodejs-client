'use strict';

const StocksExchange = require('../lib/stocks-exchange-client.js');
const pjson = require('../package.json');
const option = {
    api_key:'123456789',
    api_secret:'123456789'
};
const stocks = new StocksExchange(option);

it("version checking", function () {
    let version = stocks.version();
    if (version !== pjson.version) {
        throw new Error(`Expected ${version}, but got ${pjson.version}`);
    }
});