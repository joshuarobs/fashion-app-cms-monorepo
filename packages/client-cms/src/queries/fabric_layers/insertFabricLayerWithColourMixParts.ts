import { gql } from '@apollo/client';

const Insert_Fabric_Layer_With_Colour_Mix_Parts = gql`
  mutation insertFabricLayerWithColourMixParts(
    $fabric_layer: fabric_layers_set_input!
    $colour_mix_parts_ids: [Int!]!
  ) {
    insertFabricLayerWithColourMixParts(
      fabric_layer: $fabric_layer
      colour_mix_parts_ids: $colour_mix_parts_ids
    ) {
      id
    }
  }
`;

export { Insert_Fabric_Layer_With_Colour_Mix_Parts };
