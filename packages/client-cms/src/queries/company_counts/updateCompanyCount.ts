import { gql } from '@apollo/client';

const Update_Company_Count = gql`
  mutation updateCompanyCount($id: Int!, $changes: company_counts_set_input) {
    update_company_counts_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      company_id
      item_count
    }
  }
`;

export { Update_Company_Count };
