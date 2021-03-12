import { gql } from '@apollo/client';

const Insert_Item_Translation_Blank_Draft = gql`
  mutation insertItemTranslationBlankDraft($revisionId: uuid!) {
    insert_item_translations_one(
      object: { revision_id: $revisionId, is_release: false, full_name: "" }
    ) {
      id
      full_name
      is_release
      revision_id
      short_name
      description
    }
  }
`;

export { Insert_Item_Translation_Blank_Draft };
