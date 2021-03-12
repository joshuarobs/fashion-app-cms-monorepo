/**
 * http://localhost:9696/console/data/schema/public/tables/clothing_shells/modify
 */
import { item_maindata } from './item_maindata';
import { clothing_shell_maindata_revisions } from './clothing_shell_maindata_revisions';

interface clothing_shells {
  id: number;
  created_at: any;
  updated_at: any;
  // Object relationships
  counts: any;
  // Array relationships
  item_maindata: item_maindata;
  latest_prod: clothing_shell_maindata_revisions[];
  latest_revision: clothing_shell_maindata_revisions[];
  clothing_shell_maindata_revisions: clothing_shell_maindata_revisions[];
}

export type { clothing_shells };
