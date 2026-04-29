import { Agents } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock(
  '../../../src/infrastructure/RequestHelper',
  () => jest.requireActual('../../__mocks__/RequestHelper').default,
);

let service: Agents;

beforeEach(() => {
  service = new Agents({
    requesterFn: jest.fn(),
    token: 'abcdefg',
  });
});

describe('Agents.all', () => {
  it('should request GET /projects/1/cluster_agents without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Agents.allTokens', () => {
  it('should request GET /projects/1/cluster_agents/2/tokens without options', async () => {
    await service.allTokens(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Agents.createToken', () => {
  it('should request POST /projects/1/cluster_agents/2/tokens without options', async () => {
    await service.createToken(1, 2, 'name');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens',
      {
        body: {
          name: 'name',
          description: undefined,
        },
      },
    );
  });

  it('should request POST /projects/1/cluster_agents/2/tokens with options', async () => {
    await service.createToken(1, 2, 'name', { description: 'desc' });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens',
      {
        body: {
          name: 'name',
          description: 'desc',
        },
      },
    );
  });
});

describe('Agents.show', () => {
  it('should request GET /projects/1/cluster_agents/2 without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Agents.showToken', () => {
  it('should request GET /projects/1/cluster_agents/2/tokens/3 without options', async () => {
    await service.showToken(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('Agents.register', () => {
  it('should request POST /projects/1/cluster_agents without options', async () => {
    await service.register(1, 'name');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents', {
      body: {
        name: 'name',
      },
    });
  });
});

describe('Agents.unregister', () => {
  it('should request DEL /projects/1/cluster_agents/2 without options', async () => {
    await service.unregister(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('Agents.removeToken', () => {
  it('should request DEL /projects/1/cluster_agents/2/tokens/3 without options', async () => {
    await service.removeToken(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});
