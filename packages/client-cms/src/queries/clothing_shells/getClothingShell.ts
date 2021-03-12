import { gql } from '@apollo/client';

const Get_Clothing_Shell = gql`
  query getClothingShell($id: Int!) {
    clothing_shells_by_pk(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;

export { Get_Clothing_Shell };
