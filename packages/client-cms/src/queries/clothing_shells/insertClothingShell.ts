import { gql } from '@apollo/client';

const Insert_Clothing_Shell = gql`
  mutation insertClothingShell($name: String!, $item_type: item_types_enum!) {
    insertClothingShell(name: $name, item_type: $item_type) {
      id
      created_at
      updated_at
    }
  }
`;

export { Insert_Clothing_Shell };
