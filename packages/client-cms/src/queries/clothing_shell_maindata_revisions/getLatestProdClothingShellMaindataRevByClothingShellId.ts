import { gql } from '@apollo/client';

/**
 * Gets all clothing shell maindata revision given a clothing shell id.
 * This is used for the Settings tab for the Clothing shell page.
 */
const Get_All_Clothing_Shell_Maindata_Revisions_For_Clothing_Shell_Id = gql`
  query getAllClothingShellMaindataRevisionsForClothingShell(
    $clothingShellId: Int!
  ) {
    getAllClothingShellMaindataRevisionsForClothingShell(
      clothingShellId: $clothingShellId
    ) {
      id
      # item_id
      revision
      clothing_shell_maindata {
        id
        name
        clothing_segment_data_id
      }
    }
  }
`;

export { Get_All_Clothing_Shell_Maindata_Revisions_For_Clothing_Shell_Id };
