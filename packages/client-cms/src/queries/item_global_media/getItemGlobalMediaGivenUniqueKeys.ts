import { gql } from '@apollo/client';

const Get_Item_Global_Media_Given_Unique_Keys = gql`
  query getItemGlobalMediaGivenUniqueKeys($revision: Int!, $item_id: Int!) {
    getItemGlobalMediaGivenUniqueKeys(revision: $revision, item_id: $item_id) {
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

export { Get_Item_Global_Media_Given_Unique_Keys };
