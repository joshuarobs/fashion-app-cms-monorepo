import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';

async function insertItemTranslationPromoteToReview(
  revision_id: string
  // is_release: boolean,
  // full_name: string,
  // short_name: string,
  // description: string
) {
  logger.info(
    `graphql > insertItemTranslationPromoteToReview() :: args: id: ${revision_id}`
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
        id: revision_id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_translation_revisions_by_pk);

    const {
      state,
      item_translations,
      item_id,
    } = data1.data.item_translation_revisions_by_pk;

    // Return early if state is not Development
    if (state !== DataState.Development) {
      logger.info(
        `graphql > insertItemTranslationPromoteToReview() :: (1.a) Returned early because state is not Development`
      );
      return null;
    }

    // Return early if there is already a release Item Translation
    // (is_release = true)
    // Query assumes they are sorted ascending, therefore `false` comes
    // first and `true` comes second
    if (item_translations.length > 1) {
      logger.info(
        `graphql > insertItemTranslationPromoteToReview() :: (1.b) Returned early because there already exists a Release translation (is_release = true, found)`
      );
      return null;
    }

    // return null;

    /*
     * ============================================================
     * 2. Create a new translation with copied initial data
     * ============================================================
     */
    const { full_name, short_name, description } = item_translations[0];

    const data2 = await client.mutate({
      mutation: gql`
        mutation insertItemTranslation(
          $revision_id: uuid!
          $is_release: Boolean!
          $full_name: String!
          $short_name: String
          $description: String
        ) {
          insert_item_translations_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              full_name: $full_name
              short_name: $short_name
              description: $description
            }
          ) {
            id
            revision_id
            is_release
            full_name
            short_name
            description
          }
        }
      `,
      variables: {
        revision_id,
        is_release: true,
        full_name,
        short_name,
        description,
      },
    });

    /*
     * ============================================================
     * 3. Update the translation revision state to `Review`
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateItemTranslationRevision(
          $revisionId: uuid!
          $state: data_states_enum!
        ) {
          update_item_translation_revisions_by_pk(
            pk_columns: { id: $revisionId }
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
        revisionId: revision_id,
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
        revisionId: revision_id,
        userId,
        changeType: DataChangeType.Promotion,
        toState: DataState.Review,
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

    logger.info(
      `graphql > insertItemTranslationPromoteToReview() :: Successfully returned data`
    );
    return data2.data.insert_item_translations_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslationPromoteToReview };
