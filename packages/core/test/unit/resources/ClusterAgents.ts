import { RequesterFn } from '@gitbeaker/requester-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ClusterAgents } from '../../../src';
import { RequestHelper } from '../../../src/infrastructure';

vi.mock('../../../src/infrastructure/RequestHelper', async () => {
  const mock = await vi.importActual('../../__mocks__/RequestHelper');
  return (mock as any).default;
});

let service: ClusterAgents;

beforeEach(() => {
  service = new ClusterAgents({
    requesterFn: vi.fn<RequesterFn>(),
    token: 'abcdefg',
  });
});

describe('ClusterAgents.all', () => {
  it('should request GET /projects/1/cluster_agents without options', async () => {
    await service.all(1);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ClusterAgents.allTokens', () => {
  it('should request GET /projects/1/cluster_agents/2/tokens without options', async () => {
    await service.allTokens(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ClusterAgents.createToken', () => {
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

describe('ClusterAgents.show', () => {
  it('should request GET /projects/1/cluster_agents/2 without options', async () => {
    await service.show(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ClusterAgents.showToken', () => {
  it('should request GET /projects/1/cluster_agents/2/tokens/3 without options', async () => {
    await service.showToken(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ClusterAgents.register', () => {
  it('should request POST /projects/1/cluster_agents without options', async () => {
    await service.register(1, 'name');

    expect(RequestHelper.post()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents', {
      body: {
        name: 'name',
      },
    });
  });
});

describe('ClusterAgents.unregister', () => {
  it('should request DEL /projects/1/cluster_agents/2 without options', async () => {
    await service.unregister(1, 2);

    expect(RequestHelper.del()).toHaveBeenCalledWith(service, 'projects/1/cluster_agents/2', {
      showExpanded: undefined,
      sudo: undefined,
    });
  });
});

describe('ClusterAgents.removeToken', () => {
  it('should request DEL /projects/1/cluster_agents/2/tokens/3 without options', async () => {
    await service.removeToken(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/tokens/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ClusterAgents.allUrlConfigurations', () => {
  it('should request GET /projects/1/cluster_agents/2/url_configurations without options', async () => {
    await service.allUrlConfigurations(1, 2);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/url_configurations',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ClusterAgents.showUrlConfiguration', () => {
  it('should request GET /projects/1/cluster_agents/2/url_configurations/3 without options', async () => {
    await service.showUrlConfiguration(1, 2, 3);

    expect(RequestHelper.get()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/url_configurations/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});

describe('ClusterAgents.createUrlConfiguration', () => {
  it('should request POST /projects/1/cluster_agents/2/url_configurations without options', async () => {
    await service.createUrlConfiguration(1, 2, 'grpcs://agent.example.com:4242');

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/url_configurations',
      {
        body: {
          url: 'grpcs://agent.example.com:4242',
        },
      },
    );
  });

  it('should request POST /projects/1/cluster_agents/2/url_configurations with mTLS options', async () => {
    await service.createUrlConfiguration(1, 2, 'grpcs://agent.example.com:4242', { 
      clientCert: 'cert-data',
      clientKey: 'key-data',
      caCert: 'ca-data',
      tlsHost: 'agent.example.com'
    });

    expect(RequestHelper.post()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/url_configurations',
      {
        body: {
          url: 'grpcs://agent.example.com:4242',
          clientCert: 'cert-data',
          clientKey: 'key-data', 
          caCert: 'ca-data',
          tlsHost: 'agent.example.com',
        },
      },
    );
  });
});

describe('ClusterAgents.deleteUrlConfiguration', () => {
  it('should request DEL /projects/1/cluster_agents/2/url_configurations/3 without options', async () => {
    await service.deleteUrlConfiguration(1, 2, 3);

    expect(RequestHelper.del()).toHaveBeenCalledWith(
      service,
      'projects/1/cluster_agents/2/url_configurations/3',
      { showExpanded: undefined, sudo: undefined },
    );
  });
});