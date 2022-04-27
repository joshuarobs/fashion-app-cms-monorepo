import { gql } from '@apollo/client';

const Insert_Item_Global_Media_Promote_To_Review = gql`
  mutation insertItemGlobalMediaPromoteToReview($revision_id: String!) {
    insertItemGlobalMediaPromoteToReview(revision_id: $revision_id) {
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
      notes
    }
  }
`;

export { Insert_Item_Global_Media_Promote_To_Review };
