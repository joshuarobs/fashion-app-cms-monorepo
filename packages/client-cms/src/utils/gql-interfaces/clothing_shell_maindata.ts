/**
 * http://localhost:9696/console/data/schema/public/tables/clothing_shell_maindata/modify
 */
import { fabric_layers } from './fabric_layers';
import { clothing_shell_maindata_revisions } from './clothing_shell_maindata_revisions';
import { clothing_segment_data } from './clothing_segment_data';

interface clothing_shell_maindata {
  id: string;
  revision_id: string;
  is_release: boolean;
  name?: string;
  uniform_thickness?: number;
  default_shell_layer_id: number | null;
  default_fill_layer_id: number | null;
  default_lining_layer_id: number | null;
  default_interlining_layer_id: number | null;
  item_type: string;
  clothing_segment_data_id: string | null;
  // Object relationships
  default_shell_layer: fabric_layers | null;
  default_lining_layer: fabric_layers | null;
  default_interlining_layer: fabric_layers | null;
  default_fill_layer: fabric_layers | null;
  clothing_segment_data: clothing_segment_data;
  revision: clothing_shell_maindata_revisions;
}

export type { clothing_shell_maindata };
