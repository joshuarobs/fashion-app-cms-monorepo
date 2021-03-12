import { gql } from '@apollo/client';

const Insert_Company_Translation_Draft = gql`
  mutation insertCompanyTranslationIsRelease(
    $revision_id: uuid!
    $is_release: Boolean!
    $stylised_name: String!
    $short_name: String!
    $bio: String
  ) {
    insert_company_translations_one(
      object: {
        revision_id: $revision_id
        is_release: $is_release
        stylised_name: $stylised_name
        short_name: $short_name
        bio: $bio
      }
    ) {
      id
      revision_id
      is_release
      stylised_name
      short_name
      bio
    }
  }
`;

export { Insert_Company_Translation_Draft };
