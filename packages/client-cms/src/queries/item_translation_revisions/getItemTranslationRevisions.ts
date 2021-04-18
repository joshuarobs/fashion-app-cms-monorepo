import { gql } from '@apollo/client';

const Get_Item_Translation_Revisions = gql`
  query getItemTranslationRevisions($id: Int!) {
    getItemTranslationRevisions(id: $id) {
      id
      item_id
      locale_code
      revision
      state
      locale {
        code
        name
        country {
          value
        }
        language {
          value
        }
      }
      item_translations {
        id
        revision_id
        is_release
        full_name
        short_name
        description
      }
    }
  }
`;

export { Get_Item_Translation_Revisions };
