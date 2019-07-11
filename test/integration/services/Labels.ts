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
    expect(label.name).toBe('Test Label');
  });
});

describe('Labels.show', () => {
  it('should get a valid label on a project', async () => {
    const labelCreated = await service.create(project.id, 'Test Label2', '#FFAABB');
    const labelShown = await service.show(project.id, labelCreated.id);

    expect(labelCreated).toMatchObject(labelShown);
  });
});

describe('Labels.remove', () => {
  it('should remove/delete a valid label on a project', async () => {
    const label = await service.create(project.id, 'Test Label3', '#FFAABB');

    await service.remove(project.id, label.id);
    
    expect(service.show(project.id, label.id)).rejects.toThrow();
  });
});

// describe('Labels.all', () => {
//   it('should return a list of labels on a project', async () => {
//     const labels = await service.all(project.id);

//     expect(labels).toBeInstanceOf(Array);
//     expect(issues).toHaveLength(2);
//   });
// });