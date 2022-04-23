import { gql } from '@apollo/client';

const Update_Item_Global_Media = gql`
  mutation updateItemGlobalMedia(
    $id: String!
    $changes: item_global_media_set_input!
  ) {
    updateItemGlobalMedia(id: $id, changes: $changes) {
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
`;

export { Update_Item_Global_Media };
