import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

/**
 * Inserts a new Item Translation Revision within the Localisation's Locale
 * page, via the Locale Sidebar button "Add Locale".
 * The new first Revision starts off in the `Development` state.
 * @param item_id - The item id
 * @param locale_code - The locale we want a new revision for
 * @param name - The optional name to put as the full name and short name
 * @param context - Apollo context
 */
async function insertItemTranslationRevisionAddLocale(
  item_id: number,
  locale_code: string,
  name: string,
  context: any
) {
  logger.info(
    `graphql > insertItemTranslationRevisionAddLocale() :: args: item_id: ${item_id} | locale_code: ${locale_code} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

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
        `graphql > insertItemTranslationRevisionAddLocale() :: (1.a) Returned early because given locale_code does NOT match an existing locale (locale_code arg: "${locale_code}")`
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
              item_translations(order_by: { is_release: desc }, limit: 1) {
                id
                full_name
                short_name
                description
                is_release
              }
            }
          }
        }
      `,
      variables: {
        id: item_id,
        locale_code,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data2:', data2.data.items_by_pk);

    const { item_translation_revisions } = data2.data.items_by_pk;
    console.log('item_translation_revisions:', item_translation_revisions);

    // Check to see if there exists already translation revisions with the
    // given locale.
    // If `item_translation_revisions` is an empty array, then we can
    // continue. Otherwise we terminate early.
    if (item_translation_revisions.length > 0) {
      logger.info(
        `graphql > insertItemTranslationRevisionAddLocale() :: (2.a) Returned early because there already exist (${item_translation_revisions.length}) revisions of the given locale: ${locale_code}`
      );
      return null;
    }

    // return null;

    /*
     * ============================================================
     * 3. Insert translation revision
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation insertItemTranslationRevision(
          $item_id: Int!
          $locale_code: String!
          $revision: Int!
        ) {
          insert_item_translation_revisions_one(
            object: {
              item_id: $item_id
              locale_code: $locale_code
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
        item_id,
        locale_code,
        revision: 1,
      },
    });

    const revisionId = data3.data.insert_item_translation_revisions_one.id;
    // console.log(
    //   'data3.data.insert_item_translation_revisions_one:',
    //   data3.data.insert_item_translation_revisions_one
    // );

    /*
     * ============================================================
     * 4. Insert translation draft
     * ============================================================
     */
    const data4 = await client.mutate({
      mutation: gql`
        mutation insertItemTranslationDraft(
          $revision_id: uuid!
          $full_name: String!
          $short_name: String
        ) {
          insert_item_translations_one(
            object: {
              revision_id: $revision_id
              is_release: false
              full_name: $full_name
              short_name: $short_name
            }
          ) {
            id
            full_name
            is_release
            revision_id
            short_name
            description
          }
        }
      `,
      variables: {
        revision_id: revisionId,
        full_name: name ? name : '',
        short_name: name,
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
          $revision_id: uuid!
          $change_type: data_change_types_enum!
          $to_state: data_states_enum
          $action: data_actions_enum
          $user_id: Int!
        ) {
          insert_item_translation_revision_changes_one(
            object: {
              item_translation_revision_id: $revision_id
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
            item_translation_revision_id
            user_id
          }
        }
      `,
      variables: {
        revision_id: revisionId,
        user_id: context.user.id,
        change_type: DataChangeType.Promotion,
        to_state: DataState.Development,
      },
    });

    /*
     * ============================================================
     * 6. Update Item's `updated_at` field
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
        id: item_id,
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

export { insertItemTranslationRevisionAddLocale };
