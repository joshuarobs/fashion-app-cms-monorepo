import { gql } from '@apollo/client';

const Get_Item_Revision_Changes_Aggregates = gql`
  query GET_ITEM_REVISION_CHANGES_AGGREGATES($itemId: Int!) {
    item_maindata_revision_changes_aggregate(
      where: { item_maindata_revision: { item_id: { _eq: $itemId } } }
    ) {
      aggregate {
        count
      }
    }
    item_translation_revision_changes_aggregate(
      where: { item_translation_revision: { item_id: { _eq: $itemId } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { Get_Item_Revision_Changes_Aggregates };
