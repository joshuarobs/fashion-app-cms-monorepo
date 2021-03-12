import { gql } from '@apollo/client';

const Insert_Empty_Clothing_Shell = gql`
  mutation insertEmptyClothingShell {
    insert_clothing_shells_one(object: {}) {
      id
      created_at
      updated_at
    }
  }
`;

export { Insert_Empty_Clothing_Shell };
