'use strict';

const pjson = require('../package.json'),
    publicMethodV2 = require('./v2/public-methods.js'),
    privateMethodsV2 = require('./v2/private-methods.js'),
    privateMethodsV3 = require('./v3/private-methods.js'),
    tokenProvider = require('./v3/refresh.js');

class StocksExchange {
    constructor(options, url, api_version) {
        var self = this;
        self.api_version = api_version || 2;
        self.options = options || {};
        self.pjson = pjson;
        if (self.api_version === 2) {
            self.url = url || 'https://app.stocks.exchange/api2';
            self.validOptionV2(function (res) {
                if (!res) {
                    throw new Error('Required Api Key and Secret');
                }
            });
            self.public = new publicMethodV2(self.options, self.url);
            self.private = new privateMethodsV2(self.options, self.url);
        } else if (self.api_version === 3) {
            self.url = url || 'https://api3.stex.com';
            self.client_id = options.client.id || null;
            self.client_secret = options.client.secret || null;
            self.access_token = options.tokenObject.access_token || null;
            self.refresh_token = options.tokenObject.refresh_token || null;
            self.expires_in = options.tokenObject.expires_in || null;
            self.scope = options.scope || null;
            self.accessTokenUrl = options.accessTokenUrl;
            self.validOptionV3(function (res) {
                if (!res) {
                    throw new Error('Required Invalid require params');
                }
            });
            self.client = new tokenProvider(self.accessTokenUrl, {
                client_id: self.client_id,
                client_secret: self.client_secret,
                refresh_token: self.refresh_token,
                access_token: self.access_token,
                expires_in: self.expires_in,
                scope: self.scope
            });
            var options_new = self.options;
            var url_new = self.url;
            self.privateV2 = new privateMethodsV3(options_new, url_new, self.client);
        }
    }

    version() {
        return this.pjson.version
    }

    // API V3

    validOptionV3(cb) {
        this.client_id
        && this.client_secret
        && this.access_token
        && this.refresh_token
        && this.scope
        && this.accessTokenUrl ? cb(true) : cb(false);
    }

    profileInfo(cb) {
        return this.privateV2.getProfileInfo(function (res) {
            cb(res)
        });
    }

    profileWallets(params, cb) {
        return this.privateV2.getProfileWallets(params, function (res) {
            cb(res)
        });
    }

    profileWalletsById(walletId, cb) {
        return this.privateV2.getProfileWalletsById(walletId, function (res) {
            cb(res)
        });
    }

    newProfileWalletsByCurrencyId(currencyId, cb) {
        return this.privateV2.setProfileWalletsByCurrencyId(currencyId, function (res) {
            cb(res)
        });
    }

    profileWalletsAddressById(walletId, cb) {
        return this.privateV2.getProfileWalletsAddressById(walletId, function (res) {
            cb(res)
        });
    }

    newProfileWalletsAddressById(walletId, cb) {
        return this.privateV2.setProfileWalletsAddressById(walletId, function (res) {
            cb(res)
        });
    }

    profileDeposits(params, cb) {
        return this.privateV2.getProfileDeposits(params, function (res) {
            cb(res)
        });
    }

    profileDepositsById(id, cb) {
        return this.privateV2.getProfileDepositsById(id, function (res) {
            cb(res)
        });
    }

    profileWithdrawals(params, cb) {
        return this.privateV2.getProfileWithdrawals(params, function (res) {
            cb(res)
        });
    }

    profileWithdrawalsById(id, cb) {
        return this.privateV2.getProfileWithdrawalsById(id, function (res) {
            cb(res)
        });
    }

    createProfileWithdrawals(currency_id, amount, address, additional_address, cb) {
        return this.privateV2.sendCreateProfileWithdrawals(
            currency_id,
            amount,
            address,
            additional_address, function (res) {
            cb(res)
        });
    }

    profileWithdrawalCancelById(withdrawalId, cb) {
        return this.privateV2.profileWithdrawalCancelById(withdrawalId, function (res) {
            cb(res)
        });
    }

    reportsOrders(params, cb) {
        return this.privateV2.getReportsOrders(params, function (res) {
            cb(res)
        });
    }

    reportsOrdersById(id, cb) {
        return this.privateV2.getReportsOrdersById(id, function (res) {
            cb(res)
        });
    }

    tradingOrders(cb) {
        return this.privateV2.getTradingOrders( function (res) {
            cb(res)
        });
    }

    deleteAllTradingOrders(cb) {
        return this.privateV2.deleteAllTradingOrders( function (res) {
            cb(res)
        });
    }

    tradingOrdersById(currencyPairId, cb) {
        return this.privateV2.getTradingOrdersById(currencyPairId, function (res) {
            cb(res)
        });
    }

    deleteTradingOrdersById(currencyPairId, cb) {
        return this.privateV2.deleteTradingOrdersById(currencyPairId, function (res) {
            cb(res)
        });
    }

    createTradingOrdersById(currencyPairId, params, cb) {
        return this.privateV2.createTradingOrdersById(currencyPairId, params, function (res) {
            cb(res)
        });
    }

    tradingOrderByOrderId(orderId, cb) {
        return this.privateV2.tradingOrderByOrderId(orderId, function (res) {
            cb(res)
        });
    }

    cancelTradingOrderByOrderId(orderId, cb) {
        return this.privateV2.cancelTradingOrderByOrderId(orderId, function (res) {
            cb(res)
        });
    }

    // API V2

    validOptionV2(cb) {
        this.options.api_key && this.options.api_secret ? cb(true) : cb(false);
    }

    ticker(cb) {
        return this.public.getTicker(function (res) {
            cb(res)
        });
    }

    currencies(cb) {
        return this.public.getCurrencies(function (res) {
            cb(res)
        });
    }

    markets(cb) {
        return this.public.getMarkets(function (res) {
            cb(res)
        });
    }

    marketSummary(currency1, currency2, cb) {
        return this.public.getMarketSummary(currency1, currency2, function (res) {
            cb(res)
        });
    }

    prices(cb) {
        return this.public.getPrices(function (res) {
            cb(res)
        });
    }

    tradeHistoryPub(pair, cb) {
        return this.public.getTradeHistoryPublic(pair, function (res) {
            cb(res)
        });
    }

    orderbook(pair, cb) {
        return this.public.getOrderBook(pair, function (res) {
            cb(res)
        });
    }

    graficPublic(params, cb) {
        return this.public.getGraficPublic(params, function (res) {
            cb(res)
        });
    }

    userInfo(cb) {
        return this.private.getInfo(function (res) {
            cb(res)
        });
    }

    activeOrders(params, cb) {
        return this.private.getActiveOrders(params, function (res) {
            cb(res)
        });
    }

    trade(params, cb) {
        return this.private.setTrade(params, function (res) {
            cb(res)
        });
    }

    cancelOrder(order_id, cb) {
        return this.private.setCancelOrder(order_id, function (res) {
            cb(res)
        });
    }

    tradeHistory(params, cb) {
        return this.private.getTradeHistory(params, function (res) {
            cb(res)
        });
    }

    tradeRegisterHistory(params, cb) {
        return this.private.getTradeRegisterHistory(params, function (res) {
            cb(res)
        });
    }

    userHistory(params, cb) {
        return this.private.getUserHistory(params, function (res) {
            cb(res)
        });
    }

    transHistory(params, cb) {
        return this.private.getTransHistory(params, function (res) {
            cb(res)
        });
    }

    grafic(params, cb) {
        return this.private.getGrafic(params, function (res) {
            cb(res)
        });
    }

    generateWallets(currency, cb) {
        return this.private.getGenerateWallets(currency, function (res) {
            cb(res)
        });
    }

    deposit(currency, cb) {
        return this.private.getMakeDeposit(currency, function (res) {
            cb(res)
        });
    }

    withdraw(currency, address, amount, cb) {
        return this.private.getMakeWithdraw(currency, address, amount, function (res) {
            cb(res)
        });
    }

    remindPassword(email, cb) {
        return this.private.setRemindPassword(email, function (res) {
            cb(res)
        });
    }
}

module.exports = StocksExchange;
