/*
 * http://localhost:9696/console/data/schema/public/tables/clothing_shell_counts/modify
 */
import { clothing_shells } from './clothing_shells';

/**
 * Data describing the various data entry aggregates (calculated) for
 * clothing shells.
 */
interface clothing_shell_counts {
  id: number;
  clothing_shell_id: number;
  item_count: number;
  // Object relationships
  clothing_shell: clothing_shells;
}

export type { clothing_shell_counts };
