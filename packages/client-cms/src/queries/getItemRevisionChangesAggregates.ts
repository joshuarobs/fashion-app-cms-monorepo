import { gql } from '@apollo/client';

const Get_Item_Revision_Changes_Aggregates = gql`
  query Get_Item_Revision_Changes_Aggregates($itemId: Int!) {
    getItemRevisionChangesAggregates(itemId: $itemId) {
      item_maindata_revision_changes_aggregate {
        aggregate {
          count
        }
      }
      item_translation_revision_changes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export { Get_Item_Revision_Changes_Aggregates };
