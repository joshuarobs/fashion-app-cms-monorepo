import { gql } from '@apollo/client';

const Insert_Item_Translation_Revision_Add_Locale = gql`
  mutation insertItemTranslationRevisionAddLocale(
    $item_id: Int!
    $locale_code: String!
    $name: String
  ) {
    insertItemTranslationRevisionAddLocale(
      item_id: $item_id
      locale_code: $locale_code
      name: $name
    ) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Insert_Item_Translation_Revision_Add_Locale };
