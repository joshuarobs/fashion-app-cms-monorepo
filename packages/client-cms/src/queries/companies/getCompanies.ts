import { gql } from '@apollo/client';

const Get_Companies = gql`
  query getCompanies {
    companies(order_by: { updated_at: desc }, limit: 20) {
      id
      name
      is_reseller
      is_affiliate
      logo_url
      items_aggregate {
        aggregate {
          count
        }
      }
      collections_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export { Get_Companies };
