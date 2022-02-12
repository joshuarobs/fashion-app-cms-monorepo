import { gql } from '@apollo/client';

const Delete_Clothing_Shell = gql`
  mutation deleteClothingShell($id: Int!) {
    deleteClothingShell(id: $id) {
      id
    }
  }
`;

export { Delete_Clothing_Shell };
