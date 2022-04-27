import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

async function insertItemGlobalMediaPromoteToReview(
  revision_id: string,
  context: any
) {
  logger.info(
    `graphql > insertItemGlobalMediaPromoteToReview() :: args: id: ${revision_id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    /*
     * ============================================================
     * 1. Query the global media revision and it's global media
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getItemGlobalMediaRevisionByPk($id: uuid!) {
          item_global_media_revisions_by_pk(id: $id) {
            id
            item_id
            state
            revision
            item_global_media(order_by: { is_release: asc }) {
              id
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
      `,
      variables: {
        id: revision_id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_global_media_revisions_by_pk);

    const { state, item_global_media, item_id } =
      data1.data.item_global_media_revisions_by_pk;

    // Return early if state is not Development
    if (state !== DataState.Development) {
      logger.info(
        `graphql > insertItemGlobalMediaPromoteToReview() :: (1.a) Returned early because state is not Development`
      );
      return null;
    }

    // Return early if there is already a release Item Global Media
    // (is_release = true)
    // Query assumes they are sorted ascending, therefore `false` comes
    // first and `true` comes second
    if (item_global_media.length > 1) {
      logger.info(
        `graphql > insertItemGlobalMediaPromoteToReview() :: (1.b) Returned early because there already exists a Release Global Media (is_release = true, found)`
      );
      return null;
    }

    // return null;

    /*
     * ============================================================
     * 2. Create a new global media with copied initial data
     * ============================================================
     */
    const {
      media_1_id,
      media_2_id,
      media_3_id,
      media_4_id,
      media_5_id,
      media_6_id,
      media_7_id,
      media_8_id,
      media_9_id,
      media_10_id,
      notes,
    } = item_global_media[0];

    const data2 = await client.mutate({
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
      variables: {
        revision_id,
        is_release: true,
        media_1_id,
        media_2_id,
        media_3_id,
        media_4_id,
        media_5_id,
        media_6_id,
        media_7_id,
        media_8_id,
        media_9_id,
        media_10_id,
        notes,
      },
    });

    /*
     * ============================================================
     * 3. Update the global media revision state to `Review`
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateItemGlobalMediaRevision(
          $revision_id: uuid!
          $state: data_states_enum!
        ) {
          update_item_global_media_revisions_by_pk(
            pk_columns: { id: $revision_id }
            _set: { state: $state }
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        revision_id: revision_id,
        state: DataState.Review,
      },
    });

    /*
     * ============================================================
     * 4. Create an activity entry
     * ============================================================
     */
    const data4 = await client.mutate({
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
        revision_id: revision_id,
        user_id: context.user.id,
        change_type: DataChangeType.Promotion,
        to_state: DataState.Review,
      },
    });

    /*
     * ============================================================
     * 5. Update the item's `updated_at`
     * ============================================================
     */
    const data5 = await client.mutate({
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
        id: item_id,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertItemGlobalMediaPromoteToReview() :: Successfully returned data`
    );
    return data2.data.insert_item_global_media_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemGlobalMediaPromoteToReview };
