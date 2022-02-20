import { gql } from '@apollo/client';

const Delete_Company = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;

export { Delete_Company };
