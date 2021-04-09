import { gql } from '@apollo/client';

/**
 * Gets the item's base data (by pk), i.e. no other data from other tables
 * (except for aggregates)
 * This is used for going on the Item page, for data required by the Header,
 * overview and settings tab
 */
const Get_Item_Base_Data_By_Pk = gql`
  query getItemBaseDataByPk($id: Int!) {
    getItemBaseDataByPk(id: $id) {
      id
      short_id
      created_at
      updated_at
      item_maindata_revisions {
        id
        revision
        state
        item_maindata {
          id
          name
          brand_id
        }
      }
      item_translation_revisions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export { Get_Item_Base_Data_By_Pk };
