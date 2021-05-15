import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';

async function updateItemTranslationRevisionStatePromoteToProduction(
  id: string
) {
  logger.info(
    `graphql > updateItemTranslationRevisionStatePromoteToProduction() :: args: id: ${id}`
  );
  const userId = 1;

  try {
    /*
     * ============================================================
     * 1. Query the translation revision and it's translations
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getItemTranslationRevisionByPk($id: uuid!) {
          item_translation_revisions_by_pk(id: $id) {
            id
            item_id
            state
            revision
            locale_code
            item_translations(order_by: { is_release: asc }) {
              id
              is_release
              full_name
              short_name
              description
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_translation_revisions_by_pk);

    const {
      state,
      item_translations,
      item_id,
      locale_code,
    } = data1.data.item_translation_revisions_by_pk;

    // Return early if state is not Review
    if (state !== DataState.Review) {
      logger.info(
        `graphql > updateItemTranslationRevisionStatePromoteToProduction() :: (1.a) Returned early because state is not Review`
      );
      return null;
    }

    // Return early if there is NOT a release Item Translation
    // (is_release = true)
    // Query assumes they are sorted ascending, therefore `false` comes
    // first and `true` comes second
    if (item_translations.length <= 1) {
      logger.info(
        `graphql > updateItemTranslationRevisionStatePromoteToProduction() :: (1.b) Returned early because there is NOT a Release translation found (is_release = true)`
      );
      return null;
    }

    /*
     * ============================================================
     * 2. Update the translation revision state to `Production`
     * ============================================================
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemTranslationRevision(
          $id: uuid!
          $state: data_states_enum!
        ) {
          update_item_translation_revisions_by_pk(
            pk_columns: { id: $id }
            _set: { state: $state }
          ) {
            id
            item_id
            locale_code
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
    // Load all translation revisions related to the item
    const data3a = await client.query({
      query: gql`
        query getItemTranslationRevisionByPk(
          $id: uuid!
          $locale_code: String!
        ) {
          item_translation_revisions_by_pk(id: $id) {
            id
            item {
              id
              item_translation_revisions(
                where: { locale_code: { _eq: $locale_code } }
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
        locale_code,
      },
      fetchPolicy: 'network-only',
    });

    // console.log(
    //   'data3a:',
    //   JSON.stringify(data3a.data.item_translation_revisions_by_pk, null, 2)
    // );

    const {
      item_translation_revisions,
    } = data3a.data.item_translation_revisions_by_pk.item;
    console.log('item_translation_revisions:', item_translation_revisions);

    // Check for a previous revision
    if (item_translation_revisions.length > 1) {
      // Set the previous revision's state to Retired
      const data3b = await client.mutate({
        mutation: gql`
          mutation updateItemTranslationRevision(
            $id: uuid!
            $state: data_states_enum!
          ) {
            update_item_translation_revisions_by_pk(
              pk_columns: { id: $id }
              _set: { state: $state }
            ) {
              id
              item_id
              locale_code
              revision
              state
            }
          }
        `,
        variables: {
          id: item_translation_revisions[1].id,
          state: DataState.Retired,
        },
      });

      // Add a revision change for the newly retired previous revision
      const data3c = await client.mutate({
        mutation: gql`
          mutation insertItemTranslationRevisionChange(
            $revisionId: uuid!
            $changeType: data_change_types_enum!
            $toState: data_states_enum
            $action: data_actions_enum
            $userId: Int!
          ) {
            insert_item_translation_revision_changes_one(
              object: {
                item_translation_revision_id: $revisionId
                change_type: $changeType
                to_state: $toState
                action: $action
                user_id: $userId
              }
            ) {
              id
              date
              action
              change_type
              to_state
              item_translation_revision_id
              user_id
            }
          }
        `,
        variables: {
          revisionId: item_translation_revisions[1].id,
          userId,
          changeType: DataChangeType.Promotion,
          toState: DataState.Retired,
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
        mutation insertItemTranslationRevisionChange(
          $revisionId: uuid!
          $changeType: data_change_types_enum!
          $toState: data_states_enum
          $action: data_actions_enum
          $userId: Int!
        ) {
          insert_item_translation_revision_changes_one(
            object: {
              item_translation_revision_id: $revisionId
              change_type: $changeType
              to_state: $toState
              action: $action
              user_id: $userId
            }
          ) {
            id
            date
            action
            change_type
            to_state
            item_translation_revision_id
            user_id
          }
        }
      `,
      variables: {
        revisionId: id,
        userId,
        changeType: DataChangeType.Promotion,
        toState: DataState.Production,
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
      `graphql > updateItemTranslationRevisionStatePromoteToProduction() :: Successfully returned data`
    );
    return data2.data.update_item_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslationRevisionStatePromoteToProduction };
