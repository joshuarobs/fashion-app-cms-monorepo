/*
 * http://localhost:9696/console/data/schema/public/tables/collections/modify
 */

import { FabricLayerType } from '@joshuarobs/clothing-framework';

interface fabric_layers {
  id: number;
  thickness: number | null;
  type: string | null;
  fabric_layer_type: FabricLayerType;
  insulation: number | null;
  density: number | null;
  permeability: number | null;
  created_at: any;
  updated_at: any;
  notes: string;
  // Object relationships
  // Array relationships
  fabric_layer_and_colour_mix_parts: any;
}

export type { fabric_layers };
