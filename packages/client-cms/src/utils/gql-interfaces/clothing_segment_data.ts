/*
 * http://localhost:9696/console/data/schema/public/tables/clothing_segment_data/modify
 */
import { clothing_shell_maindata } from './clothing_shell_maindata';

interface clothing_segment_data {
  id: string;
  right_sleeve_start_front: number | null;
  right_sleeve_end_front: number | null;
  right_sleeve_start_back: number | null;
  right_sleeve_end_back: number | null;
  left_sleeve_start_front: number | null;
  left_sleeve_end_front: number | null;
  left_sleeve_start_back: number | null;
  left_sleeve_end_back: number | null;
  right_body_start_front: number | null;
  right_body_end_front: number | null;
  right_body_start_back: number | null;
  right_body_end_back: number | null;
  left_body_start_front: number | null;
  left_body_end_front: number | null;
  left_body_start_back: number | null;
  left_body_end_back: number | null;
  sleeves_is_symmetrical: boolean;
  sleeves_front_back_is_same: boolean;
  body_is_symmetrical: boolean;
  body_front_back_is_same: boolean;
  // Object relationships
  clothing_shell_maindata: clothing_shell_maindata;
}

export type { clothing_segment_data };
