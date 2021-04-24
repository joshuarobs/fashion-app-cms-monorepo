/**
 * http://localhost:9696/console/data/schema/public/tables/clothing_shell_maindata_revision_changes/modify
 */
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';
import { item_translation_revisions } from './item_translation_revisions';
import { staff_users } from './staff_users';

interface item_translation_revision_changes {
  id: string;
  item_translation_revision_id: string;
  user_id: number;
  change_type: DataChangeType;
  to_state: DataState | null;
  action: DataAction | null;
  date: any;
  // Object relationships
  item_translation_revision: item_translation_revisions;
  user: staff_users;
}

export type { item_translation_revision_changes };
