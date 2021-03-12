import { gql } from '@apollo/client';

const Get_Item_Types = gql`
  query getItemTypes {
    item_types(order_by: { value: desc }) {
      value
      description
    }
  }
`;

export { Get_Item_Types };
