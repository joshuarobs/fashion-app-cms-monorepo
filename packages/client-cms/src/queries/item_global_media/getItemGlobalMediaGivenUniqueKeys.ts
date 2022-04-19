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
      media_1 {
        id
        name
        url
      }
      media_2 {
        id
        name
        url
      }
      media_3 {
        id
        name
        url
      }
      media_4 {
        id
        name
        url
      }
      media_5 {
        id
        name
        url
      }
      media_6 {
        id
        name
        url
      }
      media_7 {
        id
        name
        url
      }
      media_8 {
        id
        name
        url
      }
      media_9 {
        id
        name
        url
      }
      media_10 {
        id
        name
        url
      }
    }
  }
`;

export { Get_Item_Global_Media_Given_Unique_Keys };
