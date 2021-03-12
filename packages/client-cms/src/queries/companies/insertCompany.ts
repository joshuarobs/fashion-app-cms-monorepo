import { gql } from '@apollo/client';

const Insert_Company = gql`
  mutation insertCompany(
    $name: String!
    $isReseller: Boolean!
    $websiteUrl: String!
  ) {
    insert_companies_one(
      object: {
        name: $name
        is_reseller: $isReseller
        website_url: $websiteUrl
      }
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
