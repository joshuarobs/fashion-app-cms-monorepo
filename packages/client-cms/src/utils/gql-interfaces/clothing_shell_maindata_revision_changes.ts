import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework';

/**
 * http://localhost:9696/console/data/schema/public/tables/clothing_shell_maindata_revision_changes/modify
 */

interface clothing_shell_maindata_revision_changes {
  id: string;
  clothing_shell_maindata_revision_id: string;
  user_id: number;
  change_type: DataChangeType;
  to_state: DataState | null;
  action: DataAction | null;
  date: any;
}

export type { clothing_shell_maindata_revision_changes };
