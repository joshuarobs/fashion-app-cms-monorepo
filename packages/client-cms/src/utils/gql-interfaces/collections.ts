/*
 * http://localhost:9696/console/data/schema/public/tables/collections/modify
 */
import { Gender } from '@joshuarobs/clothing-enums';
import { companies } from './companies';

interface collections {
  id: number;
  name: string;
  website_url: string | null;
  date_started: any;
  date_finished: any;
  created_at: any;
  updated_at: any;
  brand_id: number | null;
  for_gender: Gender;
  // Object relationships
  company: companies;
  gender: Gender;
  // Array relationships
}

export type { collections };
