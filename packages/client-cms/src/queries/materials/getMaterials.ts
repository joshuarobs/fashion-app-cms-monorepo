import { gql } from '@apollo/client';

const Get_Materials = gql`
  query getMaterials {
    materials(order_by: { id: asc }) {
      id
      name
    }
  }
`;

export { Get_Materials };
