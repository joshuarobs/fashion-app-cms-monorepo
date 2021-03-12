/**
 * http://localhost:9696/console/data/schema/public/tables/items/relationships
 */
import { item_maindata_revisions } from './item_maindata_revisions';

interface items {
  id: number;
  created_at: any;
  updated_at: any;
  short_id: number | null;
  item_family_id: number | null;
  // Array relationships
  item_maindata_revisions: item_maindata_revisions[];
  latest_prod: item_maindata_revisions[];
  latest_revision: item_maindata_revisions[];
}

export type { items };
