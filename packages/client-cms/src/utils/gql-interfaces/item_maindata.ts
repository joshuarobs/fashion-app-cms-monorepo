/*
 * http://localhost:9696/console/data/schema/public/tables/item_maindata/modify
 */
import { companies } from './companies';
import { clothing_shells } from './clothing_shells';
import { item_maindata_revisions } from './item_maindata_revisions';

/**
 * Main data about items (clothing and accessories).
 */
interface item_maindata {
  id: string;
  revision_id: string;
  is_release: boolean;
  name: string | null;
  type: string;
  short_id: number | null;
  brand_id: number | null;
  item_family_id: number | null;
  for_gender: string;
  clothing_shell_id: number | null;
  made_in_id: string | null;
  // Object relationships
  brand: companies;
  clothing_shell: clothing_shells;
  revision: item_maindata_revisions;
}

export type { item_maindata };
