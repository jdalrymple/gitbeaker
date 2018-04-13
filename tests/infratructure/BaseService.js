import { BaseService } from '../../dist/latest/infrastructure';

test('If a token or oauthToken is not passed, throw an error', async ()=> {
	expect(new BaseService()).toThrowError('`token` (private-token) or `oauth_token` is mandatory')
});

test('Url defaults to https://gitlab.com/api/v4',  async () => {
	const service = new BaseService({token: 'test'});

	expect(service.url).toBe('https://gitlab.com/api/v4');
});

test('Custom url still appends api and version number to url',  async () => {
	const service = new BaseService({url: 'https://testing.com', token: 'test'});

	expect(service.url).toBe('https://testing.com/api/v4');
});

test('Oauth token adds to authorization header as a bearer token',  async () => {
	const service = new BaseService({url: 'https://testing.com', oauthToken: '1234'});

	expect(service.headers.authorization).toBe('Bearer 1234');
});

test('Private token adds to private-token header',  async () => {
	const service = new BaseService({url: 'https://testing.com', token: '1234'});

	expect(service.headers['private-token']).toBe('1234');
});
