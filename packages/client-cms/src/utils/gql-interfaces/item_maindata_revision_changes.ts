/*
 * http://localhost:9696/console/data/schema/public/tables/item_maindata_revision_changes/modify
 */
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-enums';
import { staff_users } from './staff_users';
import { item_maindata_revisions } from './item_maindata_revisions';

/**
 * Intended for the table "item_maindata_revisions". Contains information
 * about changes made, such as and edits, deletes, updates and promotions.
 */
interface item_maindata_revision_changes {
  id: string;
  item_maindata_revision_id: string;
  user_id: number;
  change_type: DataChangeType;
  to_state: DataState | null;
  action: DataAction | null;
  date: any;
  // Object relationships
  item_maindata_revision: item_maindata_revisions;
  user: staff_users;
}

export type { item_maindata_revision_changes };
