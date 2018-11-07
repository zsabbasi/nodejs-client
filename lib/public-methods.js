'use strict';

const request = require('request'),
    httpBuildQuery = require('http-build-query'),
    DEFAULT_COUNT = 50;

class PublicMethods {

    constructor(options, url) {
        this.options = options;
        this.url = url;
    }

    getTicker(cb) {
        this.request('/ticker', function (res) {
            return cb(res)
        });
    }

    getCurrencies(cb) {
        this.request('/currencies', function (res) {
            return cb(res);
        });
    }

    getMarkets(cb) {
        this.request('/markets', function (res) {
            return cb(res);
        });
    }

    getMarketSummary(currency1, currency2, cb) {
        this.request('/market_summary/' + currency1 + '/' + currency2, function (res) {
            return cb(res);
        });
    }

    getPrices(cb) {
        this.request('/prices', function (res) {
            return cb(res);
        });
    }

    getTradeHistoryPublic(pair, cb) {
        this.request('/trades?pair=' + pair, function (res) {
            return cb(res);
        });
    }

    getOrderBook(pair, cb) {
        this.request('/orderbook?pair=' + pair, function (res) {
            return cb(res);
        });
    }

    getGraficPublic(params, cb) {

        var data = {
            pair: params.pair ? params.pair : 'BTC_USDT',
            count: params.count ? params.count : DEFAULT_COUNT,
            order: params.order ? params.order : 'DESC',
            interval: params.interval ? params.interval : '1D',
            page: params.page ? params.page : 1,
        };

        data.order = !params.since || !params.end ? 'ASC' : 'DESC';
        var url = '/grafic_public?' + httpBuildQuery(data);

        this.request(url, function (res) {
            return cb(res);
        });
    }

    request(slug, callback) {
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'stocks.exchange-client'
            },
            url: this.url + slug
        };

        request(options, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                return callback(body)
            } else {
                if (err && err.message) {
                    throw new Error(err.message);
                } else {
                    throw new Error(res.statusMessage);
                }
            }
        });
    }
}

module.exports = PublicMethods;
