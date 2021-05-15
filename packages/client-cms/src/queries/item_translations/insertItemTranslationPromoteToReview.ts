import { gql } from '@apollo/client';

const Insert_Item_Translation_Promote_To_Review = gql`
  mutation insertItemTranslationPromoteToReview(
    $revision_id: String!
  ) #    $is_release: Boolean!
  #    $full_name: String!
  #    $short_name: String
  #    $description: String
  {
    insertItemTranslationPromoteToReview(
      revision_id: $revision_id
    ) #      is_release: $is_release
    #      full_name: $full_name
    #      short_name: $short_name
    #      description: $description
    {
      id
      revision_id
      is_release
      full_name
      short_name
      description
    }
  }
`;

export { Insert_Item_Translation_Promote_To_Review };
