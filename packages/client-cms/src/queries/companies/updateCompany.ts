import { gql } from '@apollo/client';

const Update_Company = gql`
  mutation updateCompany($id: Int!, $changes: companies_set_input) {
    update_companies_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      name
      website_url
      is_affiliate
      is_reseller
      affiliate_start_date
      logo_url
      short_id
      updated_at
      counts {
        item_count
      }
    }
  }
`;

export { Update_Company };
