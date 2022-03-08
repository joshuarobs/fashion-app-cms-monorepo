import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework';

/**
 * Updates an Item Translation, alongside updating the Item's `updated_at`
 * field.
 * This is typically used when editing an Item on it's Localisations page.
 * @param id - The id of the maindata
 * @param changes - The changes to make for the maindata (e.g. name change)
 * @param context - Apollo context
 */
async function updateItemTranslation(id: string, changes: any, context: any) {
  logger.info(
    `graphql > updateItemTranslation() | args: id: ${id} | changes: ${JSON.stringify(
      changes,
      null,
      2
    )} | context: ${JSON.stringify(context, null, 2)}`
  );

  // Delete all important fields of the maindata that should not be changed
  delete changes.id;
  delete changes.revision_id;
  delete changes.is_release;

  try {
    /**
     * 1. Get information about the item maindata's related revision
     */
    const data1 = await client.query({
      query: gql`
        query getItemTranslationRelatedRevision($id: uuid!) {
          item_translations_by_pk(id: $id) {
            id
            is_release
            revision {
              id
              item_id
              revision
              state
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    console.log('data1-query:', data1.data.item_translations_by_pk);

    /**
     * 1-a. Check for valid state before continuing
     */
    const isRelease = data1.data.item_translations_by_pk.is_release;
    const relatedRevision = data1.data.item_translations_by_pk.revision;

    let isValidToChange = false;

    /*
     * Valid to change only IF:
     * 1. Draft Tab - isRelease = false, relatedRevision = Development, OR
     * 2. Release Tab - isRelease = true, relatedRevision = Review
     */
    if (
      (!isRelease && relatedRevision.state === DataState.Development) ||
      (isRelease && relatedRevision.state === DataState.Review)
    ) {
      isValidToChange = true;
    }

    // Do NOT continue if the state is NOT in Development
    if (!isValidToChange) {
      logger.info(
        `graphql > updateItemTranslation() | 1-a: Returned early because 'is_release' and 'revision.state' combinations are not valid`
      );
      return null;
    }

    /**
     * 2. Mutation to update the Maindata
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemTranslation(
          $id: uuid!
          $changes: item_translations_set_input
        ) {
          update_item_translations_by_pk(
            pk_columns: { id: $id }
            _set: $changes
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
        id,
        changes,
      },
    });

    /**
     * 3. Mutation to update the Item's updated_at
     */
    await client.mutate({
      mutation: gql`
        mutation updateItemUpdatedAt($id: Int!) {
          update_items_by_pk(
            pk_columns: { id: $id }
            _set: { updated_at: "now()" }
          ) {
            id
            updated_at
          }
        }
      `,
      variables: {
        id: relatedRevision.item_id,
      },
    });

    /**
     * 4. Create an activity entry
     */
    const data4 = await client.mutate({
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
        revision_id: relatedRevision.id,
        user_id: context.user.id,
        change_type: DataChangeType.Action,
        action: DataAction.Update,
      },
    });

    logger.info(
      `graphql > updateItemTranslation() | Successfully returned data`
    );
    return data2.data.update_item_translations_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslation };
