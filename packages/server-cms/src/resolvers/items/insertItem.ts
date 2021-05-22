import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-framework/build/enums';
import { insertItemMaindataBarebones } from '../item_maindata/insertItemMaindataBarebones';
import { insertItemMaindataRevisionChange } from '../item_maindata_revision_changes/insertItemMaindataRevisionChange';

/**
 * Insert a new Item entry with related
 * @param name
 * @param item_type
 */
async function insertItem(name: string, item_type: ItemType) {
  try {
    logger.info(
      `graphql > insertItem() :: args: name: ${name} | item_type: ${item_type}`
    );

    /*
     * 1. Insert a (Item) data entry
     */
    const data1 = await client.mutate({
      mutation: gql`
        mutation insertItemsOne {
          insert_items_one(object: {}) {
            id
            created_at
            updated_at
          }
        }
      `,
    });
    console.log('data1:', data1.data.insert_items_one);
    const itemId = data1.data.insert_items_one.id;

    /*
     * 2. Insert a (Item) maindata revision
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation insertItemMaindataRevision(
          $item_id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_item_maindata_revisions_one(
            object: { item_id: $item_id, revision: $revision, state: $state }
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        item_id: itemId,
        revision: 1,
        state: DataState.Development,
      },
    });
    console.log('data2:', data2.data.insert_item_maindata_revisions_one);
    const revisionId = data2.data.insert_item_maindata_revisions_one.id;

    /*
     * 3. Insert a (Item) maindata
     */
    const data3 = await insertItemMaindataBarebones(
      revisionId,
      true,
      name,
      item_type
    );
    console.log('data3:', data3);

    /*
     * 4. Insert a (Item) maindata revision change
     */
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
    logger.info(`graphql > insertItem() :: Successfully returned data`);
    return data1.data.insert_items_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItem };
