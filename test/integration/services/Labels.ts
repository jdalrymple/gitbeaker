import { Labels, Projects } from '../../../dist';

const config = {
  host: process.env.GITLAB_URL,
  token: process.env.PERSONAL_ACCESS_TOKEN,
};
let project;
let service: Labels;

beforeAll(async () => {
  // Crease project service
  const projectService = new Projects(config);

  // Create issue service
  service = new Labels(config);

  // Create a template project
  project = await projectService.create({ name: 'Labels Integration test' });
});

describe('Labels.create', () => {
  it('should create a valid label on a project', async () => {
    const label = await service.create(project.id, 'Test Label1', '#FFAABB');

    expect(label).toBeInstanceOf(Object);
    expect(label.name).toBe('Test Label1');
  });
});

describe('Labels.remove', () => {
  it('should remove/delete a valid label on a project', async () => {
    const label = await service.create(project.id, 'Test Label3', '#FFAABB');

    expect(service.remove(project.id, label.name)).resolves.toEqual("");
  });
});

describe('Labels.all', () => {
  beforeAll(async () => {
    const labels = [];

    for (let i = 0; i < 50; i++) {
      lables.push(service.create(project.id, `All Labels ${i}`, '#FFAABB'));
    }

    return Promise.all(labels);
  });

  it('should return a list of labels on a project', async () => {
    const labels = await service.all(project.id, { perPage: 3 });
    const filtered = labels.filter(l => l.name.includes('All Labels'));

    expect(labels).toBeInstanceOf(Array);
    expect(filtered).toHaveLength(50);
  });
});