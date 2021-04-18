import { gql } from '@apollo/client';

const Get_Fabric_Layer = gql`
  query getFabricLayer($id: Int!) {
    getFabricLayer(id: $id) {
      id
      fabric_layer_and_colour_mix_parts {
        fabric_layer_id
        colour_mix_part_id
        colour_mix_part {
          id
          percent
          colour {
            name
            base_colour
            colour_code
          }
        }
      }
    }
  }
`;

export { Get_Fabric_Layer };
