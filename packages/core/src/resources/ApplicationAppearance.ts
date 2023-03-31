import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ApplicationAppearanceSchema extends Record<string, unknown> {
  title: string;
  description: string;
  logo: string;
  header_logo: string;
  favicon: string;
  new_project_guidelines: string;
  profile_image_guidelines: string;
  header_message: string;
  footer_message: string;
  message_background_color: string;
  message_font_color: string;
  email_header_and_footer_enabled: boolean;
}

export class ApplicationAppearance<C extends boolean = false> extends BaseResource<C> {
  show<E extends boolean = false>(
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ApplicationAppearanceSchema, C, E, void>> {
    return RequestHelper.get<ApplicationAppearanceSchema>()(
      this,
      'application/appearence',
      options,
    );
  }

  edit<E extends boolean = false>(
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ApplicationAppearanceSchema, C, E, void>> {
    return RequestHelper.put<ApplicationAppearanceSchema>()(
      this,
      'application/appearence',
      options,
    );
  }
}
