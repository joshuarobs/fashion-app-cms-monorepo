import { gql } from '@apollo/client';

const Update_Company_Count_Via_Company_Id = gql`
  mutation updateCompanyCountViaCompanyId($id: Int!) {
    updateCompanyCountViaCompanyId(id: $id) {
      id
      company_id
      item_count
    }
  }
`;

export { Update_Company_Count_Via_Company_Id };
