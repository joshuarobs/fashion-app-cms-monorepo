import { gql } from '@apollo/client';

// Gets all the revisions for an item (main data only)
// Barebones (BB) data only (no other relational or foreign data)
// This is used for the Overview tab for the Item page (Revisions dropdown)
const Insert_Item_Maindata_Barebones = gql`
  mutation insertItemMaindataBarebones(
    $revisionId: uuid!
    $isRelease: Boolean!
    $name: String!
    $type: item_types_enum!
  ) {
    insert_item_maindata_one(
      object: {
        revision_id: $revisionId
        is_release: $isRelease
        name: $name
        type: $type
      }
    ) {
      id
      is_release
      name
      type
      brand_id
      clothing_shell_id
      for_gender
      item_family_id
      revision_id
      short_id
      revision {
        item_id
        revision
      }
    }
  }
`;

export { Insert_Item_Maindata_Barebones };
