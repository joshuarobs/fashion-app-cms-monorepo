/**
 * http://localhost:9696/console/data/schema/public/tables/staff_users/modify
 */

interface staff_users {
  id: string;
  email: string;
  password: string;
  name: string;
  title: string;
  role_id: number | null;
  last_online: any;
  avatar_url: number | null;
  created_at: any;
  updated_at: any;
}

export type { staff_users };
