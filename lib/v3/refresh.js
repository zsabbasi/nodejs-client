var request = require('request');
var fs = require("fs");
var EventEmitter = require('events').EventEmitter;
const jsonfile = require('jsonfile');
const settings_path = 'settings.json';

/**
 * Create a new instance of TokenProvider
 *
 * @param {String} url url to get the access token
 * @param {Object} options
 * @return {TokenProvider}
 *
 * options are:
 *  refresh_token
 *  client_id
 *  client_secret
 *
 *  optionals
 *    access_token
 *    expires_in
 */
function TokenProvider(url, options) {
    EventEmitter.call(this);

    if (!(this instanceof TokenProvider)) {
        //when calling as a function, force new.
        return new TokenProvider(url, options);
    }

    if (!url) {
        throw new Error('missing url parameter');
    }

    ['refresh_token', 'client_id', 'client_secret'].forEach(function (k) {
        if (!(k in options)) {
            throw new Error('missing ' + k + ' parameter');
        }
    });

    this.url = url;
    this.options = options;

    try {
        this.currentToken = jsonfile.readFileSync(settings_path);
    } catch (error) {
        this.currentToken = {
            access_token: this.options.access_token,
            expires_in: this.options.expires_in,
            expires_in_date: this.options.expires_in_date,
            scope: this.options.scope
        };
        jsonfile.writeFileSync(settings_path, this.currentToken);
    }

    if (this.currentToken && 'expires_in' in this.currentToken) {
        if (this.currentToken.expires_in_date == null) {
            this.currentToken.expires_in_date = new Date(new Date().getTime() + (this.currentToken.expires_in * 1000));
        }
    }
}

TokenProvider.prototype = Object.create(EventEmitter.prototype);

/**
 * Return a valid access token.
 *
 * If the current access token is expired,
 * fetch a new one.
 *
 * @param  {Function} done
 */
TokenProvider.prototype.getToken = function (done) {
    if (this.currentToken && this.currentToken.expires_in_date && new Date(this.currentToken.expires_in_date) > new Date()) {
        return done(null, this.currentToken.access_token);
    }

    request.post({
        url: this.url,
        form: {
            refresh_token: this.options.refresh_token,
            client_id: this.options.client_id,
            client_secret: this.options.client_secret,
            grant_type: 'refresh_token',
            scope: this.options.scope,
        }
    }, function (err, response, body) {
        if (err) return done(err, null);

        if (response.statusCode !== 200) {
            var error;
            if (response.headers['content-type'].indexOf('application/json')) {
                var errorBody = JSON.parse(body);
                error = new Error(errorBody.error);
            } else {
                error = new Error('error refreshing token');
                error.response_body = body;
            }
            if (fs.existsSync(settings_path)) {
                fs.unlinkSync(settings_path)
            }
            return done(error, null);
        } else {
            this.currentToken = JSON.parse(body);

            this.currentToken.expires_in_date =
                new Date((new Date()).getTime() + this.currentToken.expires_in * 1000);

            jsonfile.writeFileSync(settings_path, this.currentToken);
            this.emit('new token', this.currentToken);
            return done(null, this.currentToken.access_token);

        }
    }.bind(this));
};

module.exports = TokenProvider;
