import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse, ShowExpanded, Sudo } from '../infrastructure';

export interface ApplicationAppearanceSchema extends Record<string, unknown> {
  title: string;
  description: string;
  pwa_name: string;
  pwa_short_name: string;
  pwa_description: string;
  pwa_icon: string;
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
    {
      logo,
      pwaIcon,
      ...options
    }: {
      logo?: { content: Blob; filename: string };
      pwaIcon?: { content: Blob; filename: string };
    } & BaseRequestOptions<E> = {} as any,
  ): Promise<GitlabAPIResponse<ApplicationAppearanceSchema, C, E, void>> {
    if (logo || pwaIcon) {
      const opts: BaseRequestOptions<E> = {
        ...options,
        isForm: true,
      };

      if (logo) opts.logo = [logo.content, logo.filename];
      if (pwaIcon) opts.pwaIcon = [pwaIcon.content, pwaIcon.filename];

      return RequestHelper.put<ApplicationAppearanceSchema>()(this, 'application/appearence', opts);
    }

    return RequestHelper.put<ApplicationAppearanceSchema>()(
      this,
      'application/appearence',
      options,
    );
  }
}
