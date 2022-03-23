import { gql } from '@apollo/client';

const Get_Fabric_Layer_By_Pk = gql`
  query getFabricLayerByPk($id: Int!) {
    getFabricLayerByPk(id: $id) {
      id
      thickness
      insulation
      density
      permeability
      fabric_layer_type
      notes
      fabric_layer_and_colour_mix_parts {
        fabric_layer_id
        colour_mix_part_id
        colour_mix_part {
          id
          percent
          colour_id
          colour {
            id
            name
            base_colour
            colour_code
          }
        }
      }
    }
  }
`;

export { Get_Fabric_Layer_By_Pk };
