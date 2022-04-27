import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

/**
 * Inserts a new Item Global Media Revision within the Localisation's Global
 * Media page, via the state button "New Revision".
 * The new Revision starts off in the `Development` state.
 * @param id - The item id
 * @param context - Apollo context
 */
async function insertItemGlobalMediaRevisionPromoteNewRevision(
  id: number,
  context: any
) {
  logger.info(
    `graphql > insertItemGlobalMediaRevisionPromoteNewRevision() :: args: id: ${id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    /*
     * ============================================================
     * 2. Query the item and it's latest most global media revision
     * ============================================================
     */
    const data2 = await client.query({
      query: gql`
        query getItemAndItsLatestGlobalMediaRevisionByPk($id: Int!) {
          items_by_pk(id: $id) {
            id
            item_global_media_revisions(
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              state
              revision
              item_global_media(order_by: { is_release: desc }, limit: 1) {
                id
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
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data2:', data2.data.items_by_pk);

    const { item_global_media_revisions } = data2.data.items_by_pk;
    const hasPreviousGlobalMediaRevision =
      // Ensure we have at least 1 global media revision
      item_global_media_revisions.length > 0 &&
      // Ensure that the first global media revision has at least one global
      // media
      item_global_media_revisions[0].item_global_media.length > 0;

    // Do checks if we have an existing revision...
    if (hasPreviousGlobalMediaRevision) {
      // Return early if latest-most revision state is not Production
      if (item_global_media_revisions[0].state !== DataState.Production) {
        logger.info(
          `graphql > insertItemGlobalMediaRevisionPromoteNewRevision() :: (1.a) Returned early because item's latest-most global media revision's state is not Production`
        );
        return null;
      }
    }

    // return null;

    /*
     * ============================================================
     * 3. Create a new global media revision
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMediaRevision(
          $item_id: Int!
          $revision: Int!
        ) {
          insert_item_global_media_revisions_one(
            object: { item_id: $item_id, revision: $revision }
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        item_id: id,
        revision: item_global_media_revisions[0].revision + 1,
      },
    });

    console.log('data3:', data3.data.insert_item_global_media_revisions_one);

    /*
     * ============================================================
     * 4. Create a draft global media version
     * ============================================================
     */
    // TODO: Check to see if we have a previous revision to copy from or not
    const variables = {
      revision_id: data3.data.insert_item_global_media_revisions_one.id,
      is_release: false,
      media_1_id: null,
      media_2_id: null,
      media_3_id: null,
      media_4_id: null,
      media_5_id: null,
      media_6_id: null,
      media_7_id: null,
      media_8_id: null,
      media_9_id: null,
      media_10_id: null,
      notes: '',
    };

    if (hasPreviousGlobalMediaRevision) {
      const releaseGlobalMedia =
        item_global_media_revisions[0].item_global_media[0];
      variables.media_1_id = releaseGlobalMedia.media_1_id;
      variables.media_2_id = releaseGlobalMedia.media_2_id;
      variables.media_3_id = releaseGlobalMedia.media_3_id;
      variables.media_4_id = releaseGlobalMedia.media_4_id;
      variables.media_5_id = releaseGlobalMedia.media_5_id;
      variables.media_6_id = releaseGlobalMedia.media_6_id;
      variables.media_7_id = releaseGlobalMedia.media_7_id;
      variables.media_8_id = releaseGlobalMedia.media_8_id;
      variables.media_9_id = releaseGlobalMedia.media_9_id;
      variables.media_10_id = releaseGlobalMedia.media_10_id;
      variables.notes = releaseGlobalMedia.notes;
    }

    const data4 = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMedia(
          $revision_id: uuid!
          $is_release: Boolean!
          $media_1_id: uuid
          $media_2_id: uuid
          $media_3_id: uuid
          $media_4_id: uuid
          $media_5_id: uuid
          $media_6_id: uuid
          $media_7_id: uuid
          $media_8_id: uuid
          $media_9_id: uuid
          $media_10_id: uuid
          $notes: String!
        ) {
          insert_item_global_media_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              media_1_id: $media_1_id
              media_2_id: $media_2_id
              media_3_id: $media_3_id
              media_4_id: $media_4_id
              media_5_id: $media_5_id
              media_6_id: $media_6_id
              media_7_id: $media_7_id
              media_8_id: $media_8_id
              media_9_id: $media_9_id
              media_10_id: $media_10_id
              notes: $notes
            }
          ) {
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
      `,
      variables,
    });

    /*
     * ============================================================
     * 5. Create an activity entry
     * ============================================================
     */
    const data5 = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMediaRevisionChange(
          $revision_id: uuid!
          $change_type: data_change_types_enum!
          $to_state: data_states_enum
          $action: data_actions_enum
          $user_id: Int!
        ) {
          insert_item_global_media_revision_changes_one(
            object: {
              item_global_media_revision_id: $revision_id
              change_type: $change_type
              to_state: $to_state
              action: $action
              user_id: $user_id
            }
          ) {
            id
            date
            action
            change_type
            to_state
            item_global_media_revision_id
            user_id
          }
        }
      `,
      variables: {
        revision_id: data3.data.insert_item_global_media_revisions_one.id,
        user_id: context.user.id,
        change_type: DataChangeType.Promotion,
        to_state: DataState.Development,
      },
    });

    /*
     * ============================================================
     * 6. Update the item's `updated_at`
     * ============================================================
     */
    const data6 = await client.mutate({
      mutation: gql`
        mutation updateItemUpdatedAt($id: Int!) {
          update_items_by_pk(
            pk_columns: { id: $id }
            _set: { updated_at: "now()" }
          ) {
            updated_at
            id
          }
        }
      `,
      variables: {
        id,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertItemGlobalMediaRevisionPromoteNewRevision() :: Successfully returned data`
    );
    return data3.data.insert_item_global_media_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemGlobalMediaRevisionPromoteNewRevision };
