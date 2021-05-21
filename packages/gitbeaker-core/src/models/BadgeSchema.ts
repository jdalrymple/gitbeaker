export interface BadgeSchema extends Record<string, unknown> {
  name: string;
  id: number;
  link_url: string;
  image_url: string;
  rendered_link_url: string;
  rendered_image_url: string;
  kind: 'project' | 'group';
}
