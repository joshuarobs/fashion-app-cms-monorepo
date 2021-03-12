import { gql } from '@apollo/client';

const Delete_Company_Translations_For_Revision = gql`
  mutation deleteCompanyTranslationsForRevision($revisionId: uuid!) {
    delete_company_translations(where: { revision_id: { _eq: $revisionId } }) {
      returning {
        id
        is_release
        revision_id
        stylised_name
        short_name
        bio
      }
    }
  }
`;

export { Delete_Company_Translations_For_Revision };
