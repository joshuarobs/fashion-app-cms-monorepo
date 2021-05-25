import { gql } from '@apollo/client';

const Delete_Item_Translation_Revision_Locale_Page = gql`
  mutation deleteItemTranslationRevisionLocalePage($id: String!) {
    deleteItemTranslationRevisionLocalePage(id: $id) {
      id
      item_id
      revision
      state
      locale_code
    }
  }
`;

export { Delete_Item_Translation_Revision_Locale_Page };
