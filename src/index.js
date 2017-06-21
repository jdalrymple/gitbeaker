const API = require('./API');

module.exports = ({ url, token }) => new API({ url, token });
