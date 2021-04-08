import { gql } from '@apollo/client';

// query getCompaniesListBB($limit: Int, $offset: Int) {
//   getCompaniesListBB(limit: $limit, offset: $offset) {

const Get_Companies_List_BB = gql`
  query getCompaniesListBB($limit: Int, $offset: Int) {
    getCompaniesListBB(limit: $limit, offset: $offset) {
      id
      name
      is_reseller
      is_affiliate
      logo_url
      updated_at
      counts {
        id
        item_count
      }
      item_maindata_aggregate {
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

export { Get_Companies_List_BB };
