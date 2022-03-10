import { gql } from '@apollo/client';

const Get_Company = gql`
  query getCompany($id: Int!) {
    getCompany(id: $id) {
      id
      name
      logo_url
      website_url
      is_reseller
      is_affiliate
      created_at
      updated_at
      short_id
      affiliate_start_date
      founded_in_id
      founded_in {
        value
        description
      }
      counts {
        id
        item_count
      }
      #items_aggregate {
      #  aggregate {
      #    count
      #  }
      #}
      collections_aggregate {
        aggregate {
          count
        }
      }
      company_translation_revisions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export { Get_Company };
