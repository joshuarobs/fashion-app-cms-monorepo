/*
 * http://localhost:9696/console/data/schema/public/tables/item_maindata_revisions/modify
 */
import { DataState } from '@joshuarobs/clothing-framework';
import { items } from './items';
import { item_maindata } from './item_maindata';

/**
 * A main data revision for items, containing vital control information for
 * it's draft and release versions.
 */
interface item_maindata_revisions {
  id: string;
  item_id: number;
  revision: number;
  state: DataState;
  // Object relationships
  item: items;
  // Array relationships
  item_maindata: item_maindata[];
}

export type { item_maindata_revisions };
