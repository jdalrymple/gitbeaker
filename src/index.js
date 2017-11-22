const API = require('./API');

module.exports = ({ url, token, oauthToken }) => new API({ url, token, oauthToken });