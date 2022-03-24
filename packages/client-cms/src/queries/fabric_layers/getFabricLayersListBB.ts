import { gql } from '@apollo/client';

const Get_Fabric_Layers_List_BB = gql`
  query getFabricLayersListBB(
    $limit: Int
    $offset: Int
    $fabricLayerTypes: [fabric_layer_types_enum!]
  ) {
    getFabricLayersListBB(
      fabricLayerTypes: $fabricLayerTypes
      limit: $limit
      offset: $offset
    ) {
      id
      thickness
      insulation
      density
      permeability
      fabric_layer_type
      fabric_layer_and_colour_mix_parts {
        fabric_layer_id
        colour_mix_part_id
        colour_mix_part {
          id
          percent
          colour {
            id
            name
            colour_code
          }
        }
      }
    }
  }
`;

export { Get_Fabric_Layers_List_BB };
