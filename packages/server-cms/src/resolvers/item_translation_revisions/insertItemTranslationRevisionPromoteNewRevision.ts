import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';

/**
 * Inserts a new Item Translation Revision within the Localisation's Locale
 * page, via the state button "New Revision".
 * The new Revision starts off in the `Development` state.
 * @param id - The item id
 * @param locale_code - The locale we want a new revision for
 */
async function insertItemTranslationRevisionPromoteNewRevision(
  id: number,
  locale_code: string
) {
  logger.info(
    `graphql > insertItemTranslationRevisionPromoteNewRevision() :: args: id: ${id} | locale_code: ${locale_code}`
  );
  const userId = 1;

  try {
    /*
     * ============================================================
     * 1. Query the locale_code and see if it exists
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getLocaleByLocaleCode($code: String!) {
          locales_by_pk(code: $code) {
            code
          }
        }
      `,
      variables: {
        code: locale_code,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.locales_by_pk);
    const matchingLocale = data1.data.locales_by_pk;
    // If we didn't find a matching locale, i.e. the given `locale_code` is
    // incorrect and doesn't exist, return null
    if (!matchingLocale) {
      logger.info(
        `graphql > insertItemTranslationRevisionPromoteNewRevision() :: (1.a) Returned early because given locale_code does NOT match an existing locale (locale_code arg: "${locale_code}")`
      );
      return null;
    }

    /*
     * ============================================================
     * 2. Query the item and it's latest most translation revision
     * ============================================================
     */
    const data2 = await client.query({
      query: gql`
        query getItemAndItsLatestTranslationRevisionByPk(
          $id: Int!
          $locale_code: String!
        ) {
          items_by_pk(id: $id) {
            id
            item_translation_revisions(
              where: { locale_code: { _eq: $locale_code } }
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              state
              revision
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

    console.log('data2:', data2.data.items_by_pk);

    const { item_translation_revisions } = data2.data.items_by_pk;
    const hasPreviousTranslationRevision =
      item_translation_revisions.length > 0;

    // Do checks if we have an existing revision...
    if (hasPreviousTranslationRevision) {
      // Return early if latest-most revision state is not Production
      if (item_translation_revisions[0].state !== DataState.Production) {
        logger.info(
          `graphql > insertItemTranslationRevisionPromoteNewRevision() :: (1.a) Returned early because item's latest-most translation revision's state is not Production`
        );
        return null;
      }
    }

    return null;

    /*
     * ============================================================
     * 3. Create a new translation revision
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation insertItemTranslationRevision(
          $item_id: Int!
          $localeCode: String!
          $revision: Int!
        ) {
          insert_item_translation_revisions_one(
            object: {
              item_id: $item_id
              locale_code: $localeCode
              revision: $revision
            }
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
        item_id: id,
        locale_code,
        revision: item_translation_revisions[0].revision + 1,
      },
    });

    /*
     * ============================================================
     * 4. Create a draft translation version
     * ============================================================
     */
    // TODO: Check to see if we have a previous revision to copy from or not
    const variables = {};
    if (hasPreviousTranslationRevision) {

    }

    const data4 = await client.mutate({
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
        revision_id: id,
        is_release: false,
        // full_name,
        // short_name,
        // description,
      },
    });

    /*
     * ============================================================
     * 5. Create an activity entry
     * ============================================================
     */
    const data5 = await client.mutate({
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
      `graphql > insertItemTranslationRevisionPromoteNewRevision() :: Successfully returned data`
    );
    return data3.data.insert_item_translation_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslationRevisionPromoteNewRevision };
