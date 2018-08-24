'use strict';

const request = require('request'),
    httpBuildQuery = require('http-build-query'),
    cryptoJS = require("crypto-js");

class PrivateMethods {

    constructor(options, url) {
        this.options = options;
        this.url = url;
    }

    getInfo(cb) {
        this.request({method: 'GetInfo'}, function (res) {
            cb(res);
        })
    }

    getActiveOrders(params, cb) {
        var data = {
            pair: params.pair ? params.pair : 'ALL',
            count: params.count ? params.count : 50,
            order: params.order ? params.order : 'ASC',
            type: params.type ? params.type : 'ALL',
            owner: params.owner ? params.owner : 'ALL',
        };
        data.order = !params.since || !params.end ? 'ASC' : 'DESC';
        data.method = 'ActiveOrders';
        this.request(data, function (res) {
            cb(res);
        })
    }

    setTrade(params, cb) {
        var data = {
            type: params.type ? params.type : 'BUY',
            pair: params.pair ? params.pair : 'DOGE_BTC',
            amount: params.amount ? params.amount : 0.0,
            rate: params.rate ? params.rate : 0.0,
        };
        data.method = 'Trade';
        this.request(data, function (res) {
            cb(res);
        })
    }

    setCancelOrder(order_id, cb) {
        this.request({method: 'CancelOrder', order_id: order_id}, function (res) {
            cb(res);
        })
    }

    getTradeHistory(params, cb) {
        var data = {
            pair: params.pair ? params.pair : 'ALL',
            count: params.count ? params.count : 50,
            order: params.order ? params.order : 'ASC',
            status: params.status ? params.status : 3,
            owner: params.owner ? params.owner : 'OWN',
        };
        data.order = !params.since || !params.end ? 'ASC' : 'DESC';
        data.method = 'TradeHistory';
        this.request(data, function (res) {
            cb(res);
        })
    }

    getTradeRegisterHistory(params, cb) {
        var data = {
            currency: params.currency ? params.currency : 'ALL',
            since: params.since ? params.since : Math.round(new Date().getTime() / 1000) - (60 * 60 * 24 * 7),
            end: params.end ? params.end : Math.round(new Date().getTime() / 1000),
        };
        data.method = 'TradeRegisterHistory';
        this.request(data, function (res) {
            cb(res);
        })
    }

    getUserHistory(params, cb) {
        var data = {
            since: params.since ? params.since : Math.round(new Date().getTime() / 1000) - (60 * 60 * 24 * 7),
            end: params.end ? params.end : Math.round(new Date().getTime() / 1000),
        };
        data.method = 'UserHistory';
        this.request(data, function (res) {
            cb(res);
        })
    }

    getTransHistory(params, cb) {
        var data = {
            currency: params.currency ? params.currency : 'ALL',
            count: params.count ? params.count : 50,
            order: params.order ? params.order : 'DESC',
            operation: params.operation ? params.operation : 'ALL',
            status: params.status ? params.status : 'FINISHED',
        };
        data.order = !params.since || !params.end ? 'ASC' : 'DESC';

        if (params.operation === 'ALL') {
            data.status = 'FINISHED';
        }

        data.method = 'TransHistory';
        this.request(data, function (res) {
            cb(res);
        })
    }

    getGrafic(params, cb) {
        var data = {
            pair: params.pair ? params.pair : 'EPLUS_BTC',
            count: params.count ? params.count : 50,
            order: params.order ? params.order : 'DESC',
            interval: params.interval ? params.interval : '1D',
            page: params.page ? params.page : 1,
        };
        data.order = !params.since || !params.end ? 'ASC' : 'DESC';

        data.method = 'Grafic';
        this.request(data, function (res) {
            cb(res);
        })
    }

    getGenerateWallets(currency, cb) {
        this.request({method: 'GenerateWallets', currency: currency}, function (res) {
            cb(res);
        })
    }

    getMakeDeposit(currency, cb) {
        this.request({method: 'Deposit', currency: currency}, function (res) {
            cb(res);
        })
    }

    getMakeWithdraw(currency, address, amount, cb) {
        this.request({method: 'Withdraw', currency: currency, address: address, amount: amount}, function (res) {
            cb(res);
        })
    }

    setRemindPassword(email, cb) {
        this.request({method: 'RemindPassword', email: email}, function (res) {
            cb(res);
        })
    }

    request(params, callback) {
        var data = params || {};
        data.nonce = PrivateMethods.gen_nonce();
        var post_data = httpBuildQuery(data);
        var sign = cryptoJS.HmacSHA512(post_data, this.options.api_secret);
        var options = {
            method: 'POST',
            headers: {
                'Key': this.options.api_key,
                'Sign': sign
            },
            url: this.url,
            form: data
        };

        request(options, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                return callback(body)
            } else {
                if (err.message) {
                    throw new Error(err.message);
                } else {
                    throw new Error(res.statusMessage);
                }
            }
        });
    }

    static gen_nonce() {
        return Math.round(new Date().getTime() / 1000);
    }
}

module.exports = PrivateMethods;
