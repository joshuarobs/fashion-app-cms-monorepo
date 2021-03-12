import { gql } from '@apollo/client';

const Insert_Item_Translation_Revision = gql`
  mutation insertItemTranslationRevision(
    $entryId: Int!
    $localeCode: String!
    $revision: Int!
  ) {
    insert_item_translation_revisions_one(
      object: {
        item_id: $entryId
        locale_code: $localeCode
        revision: $revision
      }
    ) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Insert_Item_Translation_Revision };
