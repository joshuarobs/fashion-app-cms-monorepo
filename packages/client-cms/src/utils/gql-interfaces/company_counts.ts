/**
 * http://localhost:9696/console/data/schema/public/tables/company_counts/modify
 */
import { companies } from './companies';

interface company_counts {
  id: number;
  company_id: number;
  item_count: number;
  // Object relationships
  company: companies;
}

export type { company_counts };
