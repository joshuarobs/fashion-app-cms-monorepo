import { gql } from '@apollo/client';

const Get_Materials = gql`
  query getMaterials {
    getMaterials {
      id
      name
    }
  }
`;

export { Get_Materials };
