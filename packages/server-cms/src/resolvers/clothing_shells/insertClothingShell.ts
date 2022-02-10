import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-framework';
import { insertItemMaindataRevisionChange } from '../item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { insertClothingShellMaindataBarebones } from '../clothing_shell_maindata/insertClothingShellMaindataBarebones';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';

/**
 * Insert a new Clothing Shell entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.)
 * @param name
 * @param item_type
 */
async function insertClothingShell(name: string, item_type: ItemType) {
  try {
    logger.info(
      `graphql > insertClothingShell() :: args: name: ${name} | item_type: ${item_type}`
    );

    /*
     * 1. Insert a (Clothing Shell) data entry
     */
    const data1 = await client.mutate({
      mutation: gql`
        mutation insertClothingShellsOne {
          insert_clothing_shells_one(object: {}) {
            id
            created_at
            updated_at
          }
        }
      `,
    });
    console.log('data1:', data1.data.insert_clothing_shells_one);
    const clothingShellId = data1.data.insert_clothing_shells_one.id;

    /*
     * 2. Insert a (Clothing Shell) maindata revision
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation insertClothingShellMaindataRevision(
          $clothing_shell_id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_clothing_shell_maindata_revisions_one(
            object: {
              clothing_shell_id: $clothing_shell_id
              revision: $revision
              state: $state
            }
          ) {
            id
            clothing_shell_id
            revision
            state
          }
        }
      `,
      variables: {
        clothing_shell_id: clothingShellId,
        revision: 1,
        state: DataState.Development,
      },
    });
    console.log(
      'data2:',
      data2.data.insert_clothing_shell_maindata_revisions_one
    );
    const revisionId =
      data2.data.insert_clothing_shell_maindata_revisions_one.id;

    /*
     * 3. Insert a (Clothing Shell) maindata
     */
    const data3 = await insertClothingShellMaindataBarebones(
      revisionId,
      true,
      name,
      item_type
    );
    console.log('data3:', data3);

    /*
     * 4. Insert a (Item) maindata revision change
     */
    // insertClothingShellMaindataRevisionChange
    const data4 = await insertItemMaindataRevisionChange(
      revisionId,
      1,
      DataChangeType.Promotion,
      DataState.Development,
      '--'
    );
    console.log('data4:', data4);

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertClothingShell() :: Successfully returned data`
    );
    return data1.data.insert_clothing_shells_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShell };
