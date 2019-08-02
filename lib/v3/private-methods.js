'use strict';

const request = require('request'),
    httpBuildQuery = require('http-build-query');

class PrivateMethodsApiV3 {

    constructor(options, url, client) {
        this.options = options;
        this.url = url;
        this.parent_url = url;
        this.client = client;
    }

    getProfileInfo(cb) {
        this.url = this.parent_url + '/profile/info';
        this.request({}, function (res) {
            cb(res);
        })
    }

    getProfileWallets(params, cb) {
        this.url = this.parent_url + '/profile/wallets';
        this.request(params, function (res) {
            cb(res);
        })
    }

    getProfileWalletsById(walletId, cb) {
        this.url = this.parent_url + '/profile/wallets/' + walletId;
        this.request({}, function (res) {
            cb(res);
        })
    }

    setProfileWalletsByCurrencyId(currencyId, cb) {
        this.url = this.parent_url + '/profile/wallets/' + currencyId;
        this.request({}, function (res) {
            cb(res);
        }, 'POST')
    }

    getProfileWalletsAddressById(walletId, cb) {
        this.url = this.parent_url + '/profile/wallets/address/' + walletId;
        this.request({}, function (res) {
            cb(res);
        })
    }

    setProfileWalletsAddressById(walletId, cb) {
        this.url = this.parent_url + '/profile/wallets/address/' + walletId;
        this.request({}, function (res) {
            cb(res);
        }, 'POST')
    }

    getProfileDeposits(params, cb) {
        this.url = this.parent_url + '/profile/deposits';
        this.request(params, function (res) {
            cb(res);
        })
    }

    getProfileDepositsById(id, cb) {
        this.url = this.parent_url + '/profile/deposits/' + id;
        this.request({}, function (res) {
            cb(res);
        })
    }

    getProfileWithdrawals(params, cb) {
        this.url = this.parent_url + '/profile/withdrawals';
        this.request(params, function (res) {
            cb(res);
        })
    }

    getProfileWithdrawalsById(id, cb) {
        this.url = this.parent_url + '/profile/withdrawals/' + id;
        this.request({}, function (res) {
            cb(res);
        })
    }

    sendCreateProfileWithdrawals(currency_id, amount, address, additional_address, cb) {
        this.url = this.parent_url + '/profile/withdraw';
        var params = {
            currency_id: currency_id,
            amount: amount,
            address: address
        };
        if (additional_address) {
            params.additional_address_parameter = additional_address;
        }
        this.request(params, function (res) {
            cb(res);
        }, 'POST', 'form')
    }

    profileWithdrawalCancelById(id, cb) {
        this.url = this.parent_url + '/profile/withdraw/' + id;
        this.request({}, function (res) {
            cb(res);
        }, 'DELETE')
    }

    getReportsOrders(params, cb) {
        this.url = this.parent_url + '/reports/orders';
        this.request(params, function (res) {
            cb(res);
        })
    }

    getReportsOrdersById(id, cb) {
        this.url = this.parent_url + '/reports/orders/' + id;
        this.request({}, function (res) {
            cb(res);
        })
    }

    getTradingOrders(cb) {
        this.url = this.parent_url + '/trading/orders';
        this.request({}, function (res) {
            cb(res);
        })
    }

    deleteAllTradingOrders(cb) {
        this.url = this.parent_url + '/trading/orders';
        this.request({}, function (res) {
            cb(res);
        }, 'DELETE')
    }

    getTradingOrdersById(id, cb) {
        this.url = this.parent_url + '/trading/orders/' + id;
        this.request({}, function (res) {
            cb(res);
        })
    }

    deleteTradingOrdersById(id, cb) {
        this.url = this.parent_url + '/trading/orders/' + id;
        this.request({}, function (res) {
            cb(res);
        },'DELETE')
    }

    createTradingOrdersById(id, params, cb) {
        this.url = this.parent_url + '/trading/orders/' + id;
        this.request(params, function (res) {
            cb(res);
        },'POST','form')
    }

    tradingOrderByOrderId(id, cb) {
        this.url = this.parent_url + '/trading/order/' + id;
        this.request({}, function (res) {
            cb(res);
        })
    }

    cancelTradingOrderByOrderId(id, cb) {
        this.url = this.parent_url + '/trading/order/' + id;
        this.request({}, function (res) {
            cb(res);
        }, 'DELETE')
    }

    request(params, callback, method = 'GET', type = 'url') {
        var options, url, self = this;
        var data = params || {};

        this.client.getToken(function (err, token) {
            if (err) {
                return callback(err.response_body)
            }
            var post_data = httpBuildQuery(data);
            url = self.url + (post_data === '' ? '' : '?' + post_data);
            options = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'stocks.exchange-client'
                },
                url: url,
                auth: {
                    'bearer': token
                }
            };

            if (type === 'form') {
                options.form = data;
                options.url = self.url;
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }

            request(options, function (err, res, body) {
                return callback(body)
            });
        });
    }
}

module.exports = PrivateMethodsApiV3;
