import API from './API';

module.exports = ({ url, token, oauthToken, basicAuth }) => new API({ url, token, oauthToken, basicAuth });
