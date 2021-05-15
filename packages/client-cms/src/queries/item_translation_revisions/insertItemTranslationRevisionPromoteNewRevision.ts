import { gql } from '@apollo/client';

/**
 * Inserts a new Item Translation Revision within the Localisation's Locale
 * page, via the state button "New Revision".
 * The new Revision starts off in the `Development` state.
 * @param id - The item id
 * @param locale_code - The locale we want a new revision for
 */
const Insert_Item_Translation_Revision_Promote_New_Revision = gql`
  mutation insertItemTranslationRevisionPromoteNewRevision(
    $id: Int!
    $locale_code: String!
  ) {
    insertItemTranslationRevisionPromoteNewRevision(
      id: $id
      locale_code: $locale_code
    ) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Insert_Item_Translation_Revision_Promote_New_Revision };
