import { gql } from '@apollo/client';

const Get_Item_Types = gql`
  query getItemTypes {
    getItemTypes {
      value
      description
    }
  }
`;

export { Get_Item_Types };
