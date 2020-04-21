import { Licence } from '../../../src';

let service;

beforeAll(async () => {
  service = new Licence({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe.skip('Licence.all', () => {
  it('should return an array of licences', async () => {
    const settings = await service.all();

    expect(settings).toBeInstanceOf(Array);
  });
});

describe.skip('Licence.add', () => {
  it('should add a licence', async () => {
    const licence = await service.add('A cool licence');

    expect(licence).toBeObject();
  });
});

describe.skip('Licence.show', () => {
  it('should show a specific licence', async () => {
    const licence = await service.add('My fake licence');
    const licenceshow = await service.show(licence.id);

    expect(licenceshow).toMatchObject(licence);
  });
});

describe.skip('Licence.remove', () => {
  it('should show a specific licence', async () => {
    const licence = await service.add('My deleted licence');

    await service.remove(licence.id);

    await expect(service.show(licence.id)).rejects.toThrow();
  });
});
