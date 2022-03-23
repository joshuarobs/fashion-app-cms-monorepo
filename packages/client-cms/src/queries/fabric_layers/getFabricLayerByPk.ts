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
      fabric_layer_and_colour_mix_parts {
        fabric_layer_id
        colour_mix_part_id
        colour_mix_part {
          id
          percent
          colour {
            id
            name
          }
        }
      }
    }
  }
`;

export { Get_Fabric_Layer_By_Pk };
