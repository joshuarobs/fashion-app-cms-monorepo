import { gql } from '@apollo/client';

// Gets all the revisions for a clothing shell (main data only)
// Barebones (BB) data only (no other relational or foreign data)
// This is used for the Overview tab for the Clothing Shell page (Revisions
// dropdown)
const Insert_Clothing_Shell_Maindata_Barebones = gql`
  mutation insertClothingShellMaindataBarebones(
    $revisionId: uuid!
    $isRelease: Boolean!
    $name: String!
    $type: item_types_enum!
  ) {
    insert_clothing_shell_maindata_one(
      object: {
        revision_id: $revisionId
        is_release: $isRelease
        name: $name
        type: $type
      }
    ) {
      id
      revision_id
      is_release
      name
      item_type
      uniform_thickness
      default_shell_layer_id
      default_fill_layer_id
      default_lining_layer_id
      default_interlining_layer_id
      clothing_segment_data_id
      revision {
        item_id
        revision
      }
    }
  }
`;

export { Insert_Clothing_Shell_Maindata_Barebones };
