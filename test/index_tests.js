const mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect,
    TelstraSMSSDK = require('../index'),
    config = require('./config.json');

const TELSTRA_URL = 'https://beta-sapi.telstra.com';


describe('OAuth2', function() {
    let telstraSMSSDK = new TelstraSMSSDK();
    let accessToken = '';

    it('gets bearer token', function(done) {
        telstraSMSSDK.getBearerToken(config.consumerKey, config.consumerSecret, function(e, access_token, refresh_token, results) {
            console.log(access_token);
            expect(access_token).to.not.equal('');
            accessToken = access_token;
            done();
        });
    });

    it('sends message', function(done) {
        let destination = '61490691606';
        let message = "this is a test"

        telstraSMSSDK.sendSMSMessage(destination, message, accessToken, function(err, response, httpBody) {

            console.log(response.status);
            done();
        });

    });
})