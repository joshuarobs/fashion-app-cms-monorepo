import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

/**
 * Inserts a new Item Translation Revision within the Localisation's Locale
 * page, via the state button "New Revision".
 * The new Revision starts off in the `Development` state.
 * @param id - The item id
 * @param locale_code - The locale we want a new revision for
 * @param context - Apollo context
 */
async function insertItemTranslationRevisionPromoteNewRevision(
  id: number,
  locale_code: string,
  context: any
) {
  logger.info(
    `graphql > insertItemTranslationRevisionPromoteNewRevision() :: args: id: ${id} | locale_code: ${locale_code} | context: ${JSON.stringify(
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
        id,
        locale_code,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data2:', data2.data.items_by_pk);

    const { item_translation_revisions } = data2.data.items_by_pk;
    const hasPreviousTranslationRevision =
      // Ensure we have at least 1 translation revision
      item_translation_revisions.length > 0 &&
      // Ensure that the first translation revision has at least one translation
      item_translation_revisions[0].item_translations.length > 0;

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

    // return null;

    /*
     * ============================================================
     * 3. Create a new translation revision
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
        item_id: id,
        locale_code,
        revision: item_translation_revisions[0].revision + 1,
      },
    });

    console.log('data3:', data3.data.insert_item_translation_revisions_one);

    /*
     * ============================================================
     * 4. Create a draft translation version
     * ============================================================
     */
    // TODO: Check to see if we have a previous revision to copy from or not
    const variables = {
      revision_id: data3.data.insert_item_translation_revisions_one.id,
      is_release: false,
      full_name: '',
      short_name: null,
      description: null,
    };

    if (hasPreviousTranslationRevision) {
      const releaseTranslation =
        item_translation_revisions[0].item_translations[0];
      variables.full_name = releaseTranslation.full_name;
      variables.short_name = releaseTranslation.short_name;
      variables.description = releaseTranslation.description;
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
      variables,
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
        revision_id: data3.data.insert_item_translation_revisions_one.id,
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
      `graphql > insertItemTranslationRevisionPromoteNewRevision() :: Successfully returned data`
    );
    return data3.data.insert_item_translation_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslationRevisionPromoteNewRevision };
