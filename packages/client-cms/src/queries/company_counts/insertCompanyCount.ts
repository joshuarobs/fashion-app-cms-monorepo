import { gql } from '@apollo/client';

const Insert_Company_Count = gql`
  mutation insertCompanyCount($companyId: Int!) {
    insert_company_counts_one(object: { company_id: $companyId }) {
      id
      company_id
      item_count
    }
  }
`;

export { Insert_Company_Count };
