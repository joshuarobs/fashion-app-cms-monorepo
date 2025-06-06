import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
} from '@joshuarobs/clothing-framework';
import { insertItemMaindataBarebones } from '../item_maindata/insertItemMaindataBarebones';
import { insertItemMaindataRevisionChange } from '../item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { insertItemTranslationRevisionAddLocale } from '../item_translation_revisions/insertItemTranslationRevisionAddLocale';
import { insertItemGlobalMediaBarebones } from '../item_global_media/insertItemGlobalMediaBarebones';
import { insertItemGlobalMediaRevisionChange } from '../item_global_media_revision_changes/insertItemGlobalMediaRevisionChange';

/**
 * Insert a new Item entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.)
 * @param name
 * @param item_type
 */
async function insertItem(name: string, item_type: ItemType, context: any) {
  logger.info(
    `graphql > insertItem() :: args: name: ${name} | item_type: ${item_type} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    /*
     * ============================================================
     * 1. Insert a (Item) data entry
     * ============================================================
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
    // console.log('data1:', data1.data.insert_items_one);
    const itemId = data1.data.insert_items_one.id;

    /*
     * ============================================================
     * 2. Insert a (Item) maindata revision
     * ============================================================
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
    // console.log('data2:', data2.data.insert_item_maindata_revisions_one);
    const revisionId = data2.data.insert_item_maindata_revisions_one.id;

    /*
     * ============================================================
     * 3. Insert a (Item) maindata
     * ============================================================
     */
    const data3 = await insertItemMaindataBarebones(
      revisionId,
      true,
      name,
      item_type
    );
    // console.log('data3:', data3);

    /*
     * ============================================================
     * 4. Insert a (Item) maindata revision change
     * ============================================================
     */
    const data4 = await insertItemMaindataRevisionChange(
      revisionId,
      context.user.id,
      DataChangeType.Promotion,
      DataState.Development,
      '--'
    );
    // console.log('data4:', data4);

    /*
     * ============================================================
     * 5. Insert a (Global Media) maindata revision
     * ============================================================
     */
    const data5 = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMediaRevision(
          $item_id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_item_global_media_revisions_one(
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
    // console.log('data2:', data2.data.insert_item_maindata_revisions_one);
    const globalMediaRevisionId =
      data5.data.insert_item_global_media_revisions_one.id;

    /*
     * ============================================================
     * 6. Insert a (Global Media) maindata
     * ============================================================
     */
    const data6 = await insertItemGlobalMediaBarebones(
      globalMediaRevisionId,
      false,
      context
    );
    console.log('data6:', data6);

    /*
     * ============================================================
     * 7. Insert a (Item Global Media) revision change
     * ============================================================
     */
    const data7 = await insertItemGlobalMediaRevisionChange(
      globalMediaRevisionId,
      context.user.id,
      DataChangeType.Promotion,
      DataState.Development,
      context,
      '--'
    );

    /*
     * ============================================================
     * 8. Insert a locale for en-US
     * ============================================================
     */
    const data8 = await insertItemTranslationRevisionAddLocale(
      itemId,
      'en-US',
      name,
      context
    );

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
