import { gql } from '@apollo/client';

const Delete_Fabric_Layer_And_Its_Colour_Mix_Parts = gql`
  mutation deleteFabricLayerAndItsColourMixParts($id: Int!) {
    deleteFabricLayerAndItsColourMixParts(id: $id) {
      id
    }
  }
`;

export { Delete_Fabric_Layer_And_Its_Colour_Mix_Parts };
