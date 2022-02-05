/**
 * http://localhost:9696/console/data/schema/public/tables/item_translations/modify
 */
import { DataState } from '@joshuarobs/clothing-framework';
import { items } from './items';

interface item_translation_revisions {
  id: string;
  item_id: number;
  locale_code: string;
  revision: number;
  state: DataState;
  // Object relationships
  item: items;
  locale: string;
  // Array relationships
  item_translations: item_translation_revisions[];
}

export type { item_translation_revisions };
