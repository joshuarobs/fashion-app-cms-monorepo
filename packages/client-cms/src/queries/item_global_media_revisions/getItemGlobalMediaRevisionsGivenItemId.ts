import { gql } from '@apollo/client';

const Get_Item_Global_Media_Revisions_Given_Item_Id = gql`
  query getItemGlobalMediaRevisionsGivenItemId($item_id: Int!) {
    getItemGlobalMediaRevisionsGivenItemId(item_id: $item_id) {
      id
      item_id
      revision
      state
      item_global_media {
        id
        revision_id
        is_release
        media_1_id
        media_2_id
        media_3_id
        media_4_id
        media_5_id
        media_6_id
        media_7_id
        media_8_id
        media_9_id
        media_10_id
      }
    }
  }
`;

export { Get_Item_Global_Media_Revisions_Given_Item_Id };
