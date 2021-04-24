/**
 * http://localhost:9696/console/data/schema/public/tables/clothing_shell_maindata_revisions/modify
 */
import { DataState } from '@joshuarobs/clothing-framework/build/enums';
import { clothing_shells } from './clothing_shells';
import { clothing_shell_maindata } from './clothing_shell_maindata';

interface clothing_shell_maindata_revisions {
  id: string;
  clothing_shell_id: number;
  revision: number;
  state: DataState;
  // Object relationships
  clothing_shell: clothing_shells;
  // Array relationships
  clothing_shell_maindata: clothing_shell_maindata[];
}

export type { clothing_shell_maindata_revisions };
