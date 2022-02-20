import { gql } from '@apollo/client';

const Insert_Company = gql`
  mutation insertCompany(
    $name: String!
    $is_reseller: Boolean!
    $website_url: String!
  ) {
    insertCompany(
      name: $name
      is_reseller: $is_reseller
      website_url: $website_url
    ) {
      id
      name
      is_reseller
      created_at
      updated_at
    }
  }
`;

export { Insert_Company };
