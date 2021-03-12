/**
 * http://localhost:9696/console/data/schema/public/tables/item_translations/modify
 */
import { item_translation_revisions } from './item_translation_revisions';

interface item_translations {
  id: string;
  revision_id: string;
  full_name: string;
  short_name: string | null;
  description: string | null;
  // Object relationships
  revision: item_translation_revisions;
}

export type { item_translations };
