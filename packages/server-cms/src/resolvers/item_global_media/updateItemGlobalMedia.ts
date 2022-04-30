import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework';
import { getItemAndMediaItemAssociatedForItemId } from '../item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';

/**
 * Updates an Item Global Media, alongside updating the Item's `updated_at`
 * field.
 * This is typically used when editing an Item on its Localisations page in
 * the Global Media tab.
 * @param id - The id of the maindata
 * @param changes - The changes to make for the maindata (e.g. name change)
 * @param context - Apollo context
 */
async function updateItemGlobalMedia(id: string, changes: any, context: any) {
  logger.info(
    `graphql > updateItemGlobalMedia() | args: id: ${id} | changes: ${JSON.stringify(
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
    /*
     * ============================================================
     * 1. Get information about the item maindata's related revision
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getItemGlobalMediaRelatedRevision($id: uuid!) {
          item_global_media_by_pk(id: $id) {
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
    console.log('data1-query:', data1.data.item_global_media_by_pk);

    /*
     * 1-a. Check for valid state before continuing
     */
    const isRelease = data1.data.item_global_media_by_pk.is_release;
    const relatedRevision = data1.data.item_global_media_by_pk.revision;

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
        `graphql > updateItemGlobalMedia() | 1-a: Returned early because 'is_release' and 'revision.state' combinations are not valid`
      );
      return null;
    }

    /*
     * ============================================================
     * 2. Mutation to update the Global Media
     * ============================================================
     */
    // Maybe we should validate the ids in-case they get corrupted during
    // the transfer to the server? Might not be necessary because the
    // mutation will fail because ids have strict foreign key requirements

    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemGlobalMedia(
          $id: uuid!
          $changes: item_global_media_set_input
        ) {
          update_item_global_media_by_pk(
            pk_columns: { id: $id }
            _set: $changes
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
        id,
        changes,
      },
    });
    console.log('data2:', data2);

    /*
     * ============================================================
     * 3. Add any new media to the associated media tables
     * ============================================================
     */
    // Get all the ids of the item global media into an array we can easily
    // work with
    const updatedMediaIds = [];
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
    } = data2.data.update_item_global_media_by_pk;

    if (media_1_id) updatedMediaIds.push(media_1_id);
    if (media_2_id) updatedMediaIds.push(media_2_id);
    if (media_3_id) updatedMediaIds.push(media_3_id);
    if (media_4_id) updatedMediaIds.push(media_4_id);
    if (media_5_id) updatedMediaIds.push(media_5_id);
    if (media_6_id) updatedMediaIds.push(media_6_id);
    if (media_7_id) updatedMediaIds.push(media_7_id);
    if (media_8_id) updatedMediaIds.push(media_8_id);
    if (media_9_id) updatedMediaIds.push(media_9_id);
    if (media_10_id) updatedMediaIds.push(media_10_id);
    console.log('updatedMediaIds:', updatedMediaIds);

    // Get a list of all existing associated media with this item
    const data3a = await getItemAndMediaItemAssociatedForItemId(
      relatedRevision.item_id,
      0,
      0
    );
    console.log('data3a:', data3a);
    const existingIds = new Set(
      data3a.map(({ media_item_id }: any) => media_item_id)
    );
    console.log('existingIds:', existingIds);

    const remainingNewIdsToAdd = updatedMediaIds.filter(
      (x) => !existingIds.has(x)
    );
    console.log('remainingNewIdsToAdd:', remainingNewIdsToAdd);

    const objects: any[] = remainingNewIdsToAdd.map((media_item_id) => ({
      item_id: relatedRevision.item_id,
      media_item_id,
    }));
    // [{ item_id: 10, media_item_id: "" }]

    // eslint-disable-next-line no-constant-condition
    if (objects.length > 0) {
      const data3 = await client.mutate({
        mutation: gql`
          mutation insertItemAndMediaItemAssociatedMultiple(
            $objects: [item_and_media_item_associated_insert_input!]!
          ) {
            insert_item_and_media_item_associated(objects: $objects) {
              returning {
                item_id
                media_item_id
              }
            }
          }
        `,
        variables: {
          objects,
        },
      });
      console.log('data3:', data3);
    }

    /*
     * ============================================================
     * 4. Mutation to update the Item's updated_at
     * ============================================================
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
        revision_id: relatedRevision.id,
        user_id: context.user.id,
        change_type: DataChangeType.Action,
        action: DataAction.Update,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > updateItemGlobalMedia() | Successfully returned data`
    );
    return data2.data.update_item_global_media_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemGlobalMedia };
