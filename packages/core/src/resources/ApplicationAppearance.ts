import type {
  BaseRequestBodyRecordOptions,
  GitlabAPIResponse,
  ShowExpanded,
  Sudo,
} from '../infrastructure';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, createFormData } from '../infrastructure';

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
    options?: ShowExpanded<E> & Sudo,
  ): Promise<GitlabAPIResponse<ApplicationAppearanceSchema, C, E, void>> {
    const { sudo, showExpanded } = options || {};

    return RequestHelper.get<ApplicationAppearanceSchema>()(this, 'application/appearance', {
      sudo,
      showExpanded,
    });
  }

  edit<E extends boolean = false>(
    options?: {
      logo?: { content: Blob; filename: string };
      pwaIcon?: { content: Blob; filename: string };
    } & BaseRequestBodyRecordOptions &
      ShowExpanded<E> &
      Sudo,
  ): Promise<GitlabAPIResponse<ApplicationAppearanceSchema, C, E, void>> {
    const { sudo, showExpanded, logo, pwaIcon, ...remaining } = options || {};
    let body: FormData | BaseRequestBodyRecordOptions;

    if (logo || pwaIcon) {
      const formDataOpts: Record<string, any> = { ...remaining };

      if (logo) formDataOpts.logo = [logo.content, logo.filename];
      if (pwaIcon) formDataOpts.pwaIcon = [pwaIcon.content, pwaIcon.filename];

      body = createFormData(formDataOpts);
    } else {
      body = remaining;
    }

    return RequestHelper.put<ApplicationAppearanceSchema>()(this, 'application/appearance', {
      sudo,
      showExpanded,
      body,
    });
  }
}
