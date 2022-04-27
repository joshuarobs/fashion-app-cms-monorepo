import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

async function updateItemGlobalMaindataRevisionStatePromoteToProduction(
  id: string,
  context: any
) {
  logger.info(
    `graphql > updateItemGlobalMaindataRevisionStatePromoteToProduction() :: args: id: ${id} | context: ${JSON.stringify(
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
              is_release
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_global_media_revisions_by_pk);

    const { state, item_global_media, item_id } =
      data1.data.item_global_media_revisions_by_pk;

    // Return early if state is not Review
    if (state !== DataState.Review) {
      logger.info(
        `graphql > updateItemGlobalMaindataRevisionStatePromoteToProduction() :: (1.a) Returned early because state is not Review`
      );
      return null;
    }

    // Return early if there is NOT a release Item Global Media
    // (is_release = true)
    // Query assumes they are sorted ascending, therefore `false` comes
    // first and `true` comes second
    if (item_global_media.length <= 1) {
      logger.info(
        `graphql > updateItemGlobalMaindataRevisionStatePromoteToProduction() :: (1.b) Returned early because there is NOT a Release global media found (is_release = true)`
      );
      return null;
    }

    /*
     * ============================================================
     * 2. Update the global media revision state to `Production`
     * ============================================================
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemGlobalMediaRevision(
          $id: uuid!
          $state: data_states_enum!
        ) {
          update_item_global_media_revisions_by_pk(
            pk_columns: { id: $id }
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
        id,
        state: DataState.Production,
      },
    });

    /*
     * ============================================================
     * 3. If there is a previous revision, retire it
     * ============================================================
     */
    // Load all global media revisions related to the item
    const data3a = await client.query({
      query: gql`
        query getItemGlobalMediaRevisionByPk(
          $id: uuid! #          $locale_code: String!
        ) {
          item_global_media_revisions_by_pk(id: $id) {
            id
            item {
              id
              item_global_media_revisions(
                #                where: { locale_code: { _eq: $locale_code } }
                order_by: { revision: desc }
              ) {
                id
                state
                revision
              }
            }
          }
        }
      `,
      variables: {
        id,
        // locale_code,
      },
      fetchPolicy: 'network-only',
    });

    // console.log(
    //   'data3a:',
    //   JSON.stringify(data3a.data.item_translation_revisions_by_pk, null, 2)
    // );

    const { item_global_media_revisions } =
      data3a.data.item_global_media_revisions_by_pk.item;
    console.log('item_global_media_revisions:', item_global_media_revisions);

    // Check for a previous revision
    if (item_global_media_revisions.length > 1) {
      // Set the previous revision's state to Retired
      const data3b = await client.mutate({
        mutation: gql`
          mutation updateItemGlobalMediaRevision(
            $id: uuid!
            $state: data_states_enum!
          ) {
            update_item_global_media_revisions_by_pk(
              pk_columns: { id: $id }
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
          id: item_global_media_revisions[1].id,
          state: DataState.Retired,
        },
      });

      // Add a revision change for the newly retired previous revision
      const data3c = await client.mutate({
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
          revision_id: item_global_media_revisions[1].id,
          user_id: context.user.id,
          change_type: DataChangeType.Promotion,
          to_state: DataState.Retired,
        },
      });
    }

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
        revision_id: id,
        user_id: context.user.id,
        change_type: DataChangeType.Promotion,
        to_state: DataState.Production,
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
      `graphql > updateItemGlobalMaindataRevisionStatePromoteToProduction() :: Successfully returned data`
    );
    return data2.data.update_item_global_media_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemGlobalMaindataRevisionStatePromoteToProduction };
