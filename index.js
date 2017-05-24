const OAuth = require('oauth'),
    request = require('request');

const TELSTRA_URL = 'https://beta-sapi.telstra.com';


function TelstraSMSSDK() {

};

TelstraSMSSDK.prototype.getBearerToken = function(consumerKey, consumerSecret, callback) {
    var OAuth2 = OAuth.OAuth2;
    var oauth2 = new OAuth2(consumerKey,
        consumerSecret,
        TELSTRA_URL,
        null,
        '/v1/oauth/token',
        null);

    oauth2.getOAuthAccessToken(
        '', { 'grant_type': 'client_credentials' },
        callback);
};

TelstraSMSSDK.prototype.sendSMSMessage = function(to, body, accessToken, callback) {
    request.post(
        TELSTRA_URL + '/v2/messages/sms', {
            json: {
                to: to,
                body: body
            },
            'auth': {
                'bearer': accessToken
            },
        },
        callback
    );
}

module.exports = TelstraSMSSDK;