import { gql } from '@apollo/client';

/**
 * Mainly used on a client, to get the item and a locale data
 */
const Get_Item_With_Locale_Data = gql`
  query getItemWithLocaleData {
    items_by_pk(id: 4) {
      id
      type
      company {
        id
        name
      }
      item_maindata_revisions(
        order_by: { revision: desc }
        where: { state: { _eq: Production } }
        limit: 1
      ) {
        id
        revision
        state
        item_maindata(where: { is_release: { _eq: true } }, limit: 1) {
          id
          is_release
          name
          type
          short_id
          brand {
            id
            is_reseller
            name
          }
        }
      }
      item_translation_revisions(
        where: { state: { _eq: Production }, locale_code: { _eq: "en-US" } }
        order_by: { revision: desc }
        limit: 1
      ) {
        id
        locale_code
        revision
        state
        item_translations(where: { is_release: { _eq: true } }, limit: 1) {
          id
          is_release
          full_name
          short_name
          description
        }
      }
    }
  }
`;

export { Get_Item_With_Locale_Data };
