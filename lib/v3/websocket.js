'use strict';
const io = require("socket.io-client");

class WebcosketApiV3 {

    constructor(client) {
        this.socket = io.connect("https://socket.stex.com");
        this.client = client;
    }

    subscribeRate(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\Ticker", function(obj){cb(obj)});
    }

    subscribeOrderFillCreated(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\OrderFillCreated", function(obj){cb(obj)});
    }

    subscribeGlassTotalChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\GlassTotalChanged", function(obj){cb(obj)});
    }

    subscribeGlassRowChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\GlassRowChanged", function(obj){cb(obj)});
    }

    subscribeBestPriceChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\BestPriceChanged", function(obj){cb(obj)});
    }

    subscribeCandleChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel,
            auth: {}
        });
        this.subscribe("App\\Events\\CandleChanged", function(obj){cb(obj)});
    }

    subscribeBalanceChanged(channel, cb) {
        this.subscribePrivate(channel, 'BalanceChanged', function(obj) {
            cb(obj)
        })
    }

    subscribeUserOrder(channel, cb) {
        this.subscribePrivate(channel, 'UserOrder', function(obj) {
            cb(obj)
        })
    }

    subscribeUserOrderDeleted(channel, cb) {
        this.subscribePrivate(channel, 'UserOrderDeleted', function(obj) {
            cb(obj)
        })
    }

    subscribeUserOrderFillCreated(channel, cb) {
        this.subscribePrivate(channel, 'UserOrderFillCreated', function(obj) {
            cb(obj)
        })
    }

    subscribe(name, cb) {
        this.socket.on(name, function(msg, obj) {
            cb(obj)
        });
    }

    subscribePrivate(channel,name, cb) {
        var self = this;
        this.client.getToken(function (err, token) {
            self.socket.emit('subscribe', {
                channel: channel,
                auth: {headers: {Authorization: 'Bearer ' + token}}
            });
            self.subscribe("App\\Events\\" + name, function(obj){cb(obj)});
        });
    }
}

module.exports = WebcosketApiV3;
