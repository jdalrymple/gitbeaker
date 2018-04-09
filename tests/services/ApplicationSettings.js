import Test from 'blue-tape';
import { ApplicationSettings } from '../../dist/latest';

Test('Basic init of ApplicationSettings library', async (assert)=> {
	const service = new ApplicationSettings({ url: process.env.TEST_URL, token: process.env.TEST_TOKEN });

	assert.true(true);
});

Test('Getting all the application settings', async (assert) => {
	const service = new ApplicationSettings({ url: process.env.TEST_URL, token: process.env.TEST_TOKEN });
	const settings = await service.all();

	// Check the settings
	assert.true(true);
});

Test('Edit the application settings', async (assert) => {
	const service = new ApplicationSettings({ url: process.env.TEST_URL, token: process.env.TEST_TOKEN });
	const settings = await service.edit({

	});

	// Check the settings
	// Return to original state
	assert.true(true);
});

Test.onFinish(() => process.exit(0));
