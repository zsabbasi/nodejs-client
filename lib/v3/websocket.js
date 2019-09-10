'use strict';
const io = require("socket.io-client");

class WebcosketApiV3 {

    constructor(client) {
        this.socket = io.connect("https://socket.stex.com");
        this.client = client;
    }

    subscribeRate(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\Ticker", function(obj){cb(obj)});
    }

    subscribeOrderFillCreated(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\OrderFillCreated", function(obj){cb(obj)});
    }

    subscribeGlassTotalChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\GlassTotalChanged", function(obj){cb(obj)});
    }

    subscribeGlassRowChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\GlassRowChanged", function(obj){cb(obj)});
    }

    subscribeBestPriceChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
        });
        this.subscribe("App\\Events\\BestPriceChanged", function(obj){cb(obj)});
    }

    subscribeCandleChanged(channel, cb) {
        this.socket.emit('subscribe', {
            channel: channel
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
        this.socket.on('connect', function() {
            console.log('Connected');
        });
        this.socket.on('connect_failed', function() {
            throw new Error('Sorry, there seems to be an issue with the connection!');
        });
        this.socket.on('disconnect', function() {
            console.log('Disconnected');
        });
        this.socket.on('error', function() {
            throw new Error('Undefined Error');
        });
        this.socket.on('reconnect_failed', function() {
            throw new Error('Reconnect_failed');
        });
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
