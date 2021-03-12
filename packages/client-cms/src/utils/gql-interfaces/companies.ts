/**
 * http://localhost:9696/console/data/schema/public/tables/companies/modify
 */
import { company_counts } from './company_counts';
import { item_maindata } from './item_maindata';

interface companies {
  id: number;
  name: string;
  website_url: string;
  is_reseller: boolean;
  is_affiliate: boolean;
  logo_url: string | null;
  created_at: any;
  updated_at: any;
  affiliate_start_date: any;
  short_id: number | null;
  founded_in_id: string | null;
  // Object relationships
  counts: company_counts;
  // Array relationships
  item_maindata: item_maindata[];
}

export type { companies };
