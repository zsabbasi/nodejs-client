'use strict';

const pjson = require('../package.json'),
    publicMethod = require('./public-methods.js'),
    privateMethods = require('./private-methods.js');

class StocksExchange {
    constructor(options, url) {
        this.options = options || {};
        this.url = url || 'https://app.stocks.exchange/api2';
        this.validOption(function (res) {
            if (!res) {
                throw new Error('Required Api Key and Secret');
            }
        });
        this.pjson = pjson;
        this.public = new publicMethod(this.options, this.url);
        this.private = new privateMethods(this.options, this.url);
    }

    version() {
        return this.pjson.version
    }

    validOption(cb) {
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

    userInfo(cb){
        return this.private.getInfo(function (res) {
            cb(res)
        });
    }

    activeOrders(params, cb){
        return this.private.getActiveOrders(params, function (res) {
            cb(res)
        });
    }

    trade(params, cb){
        return this.private.setTrade(params, function (res) {
            cb(res)
        });
    }

    cancelOrder(order_id, cb){
        return this.private.setCancelOrder(order_id, function (res) {
            cb(res)
        });
    }

    tradeHistory(params, cb){
        return this.private.getTradeHistory(params, function (res) {
            cb(res)
        });
    }

    tradeRegisterHistory(params, cb){
        return this.private.getTradeRegisterHistory(params, function (res) {
            cb(res)
        });
    }

    userHistory(params, cb){
        return this.private.getUserHistory(params, function (res) {
            cb(res)
        });
    }

    transHistory(params, cb){
        return this.private.getTransHistory(params, function (res) {
            cb(res)
        });
    }

    grafic(params, cb){
        return this.private.getGrafic(params, function (res) {
            cb(res)
        });
    }

    generateWallets(currency, cb){
        return this.private.getGenerateWallets(currency, function (res) {
            cb(res)
        });
    }

    deposit(currency, cb){
        return this.private.getMakeDeposit(currency, function (res) {
            cb(res)
        });
    }

    withdraw(currency, address, amount, cb){
        return this.private.getMakeWithdraw(currency, address, amount, function (res) {
            cb(res)
        });
    }

    remindPassword(email, cb){
        return this.private.setRemindPassword(email, function (res) {
            cb(res)
        });
    }
}

module.exports = StocksExchange;
