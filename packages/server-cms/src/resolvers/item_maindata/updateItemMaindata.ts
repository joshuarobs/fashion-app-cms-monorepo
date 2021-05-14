import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';

/**
 * Updates an Item Maindata, alongside updating the Item's `updated_at` field.
 * This is typically used when editing an Item on it's Overview page.
 * @param id - The id of the maindata
 * @param changes - The changes to make for the maindata (e.g. name change)
 * @param itemId - The id of the item the maindata belongs to
 */
async function updateItemMaindata(
  id: string,
  changes: any,
  itemId: number,
  countsId?: number
) {
  logger.info(
    `graphql > updateItemMaindata() | args: id: ${id} | changes: ${JSON.stringify(
      changes,
      null,
      2
    )} | itemId: ${itemId} | countsId: ${countsId}`
  );

  // Delete all important fields of the maindata that should not be changed
  delete changes.id;
  delete changes.revision_id;
  delete changes.is_release;

  const userId = 1;

  try {
    /**
     * 1. Get information about the item maindata's related revision
     */
    const data1 = await client.query({
      query: gql`
        query getItemMaindataRelatedRevision($id: uuid!) {
          item_maindata_by_pk(id: $id) {
            id
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
    // console.log('data1-query:', data1.data.item_maindata_by_pk);

    /**
     * 1-a. Check for valid state before continuing
     */
    const relatedRevision = data1.data.item_maindata_by_pk.revision;

    // Do NOT continue if the state is NOT in Development
    if (relatedRevision.state !== DataState.Development) {
      return null;
    }

    /**
     * 2. Mutation to update the Maindata
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemMaindata(
          $id: uuid!
          $changes: item_maindata_set_input
        ) {
          update_item_maindata_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
            name
            short_id
            type
            brand_id
            for_gender
            made_in_id
            clothing_shell_id
            clothing_shell {
              id
              #items_aggregate {
              #  aggregate {
              #    count
              #  }
              #}
            }
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
        id: itemId,
      },
    });

    /**
     * 4. Create an activity entry
     */
    const data4 = await client.mutate({
      mutation: gql`
        mutation insertItemMaindataRevisionChange(
          $revisionId: uuid!
          $changeType: data_change_types_enum!
          $toState: data_states_enum
          $action: data_actions_enum
          $userId: Int!
        ) {
          insert_item_maindata_revision_changes_one(
            object: {
              item_maindata_revision_id: $revisionId
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
            item_maindata_revision_id
            user_id
          }
        }
      `,
      variables: {
        revisionId: relatedRevision.id,
        userId,
        changeType: DataChangeType.Action,
        action: DataAction.Update,
      },
    });

    /**
     * (Optional)
     * 5. If we changed this item's clothing shell, update that clothing
     * shell's item count (to reflect the recent change)
     */
    // Note, were this argument provided incorrectly via malice or accident,
    // it wouldn't do much harm to the data, as this internal data that we
    // see in the CMS is only for us to look at. This data can always be
    // updated manually via a button, or via some script automatically (by
    // time intervals).
    if (countsId) {
      /**
       * 5a. Get the clothing shell's unique item count
       */
      const data5a = await client.query({
        query: gql`
          query getNumOfUniqueItemsForClothingShell($id: Int!) {
            item_maindata_revisions_aggregate(
              where: {
                item_maindata: { clothing_shell_id: { _eq: $id } }
                # state: { _eq: Production }
              }
              # order_by: { item_id: asc, revision: desc }
              distinct_on: item_id
            ) {
              aggregate {
                count
              }
            }
          }
        `,
        variables: {
          id: countsId,
        },
        fetchPolicy: 'network-only',
      });
      // console.log('data3:', data3);
      // console.log(
      //   'count:',
      //   data3.data.item_maindata_revisions_aggregate.aggregate.count
      // );

      /**
       * 5b. Update the clothing shell with the value obtained in 3a
       */
      const data5b = await client.mutate({
        mutation: gql`
          mutation updateClothingShellCountByClothingShellId(
            $id: Int!
            $changes: clothing_shell_counts_set_input
          ) {
            update_clothing_shell_counts(
              where: { clothing_shell_id: { _eq: $id } }
              _set: $changes
            ) {
              returning {
                id
                clothing_shell_id
                item_count
              }
            }
          }
        `,
        variables: {
          id: countsId,
          changes: {
            item_count:
              data5a.data.item_maindata_revisions_aggregate.aggregate.count,
          },
        },
      });
    }

    return data2.data.update_item_maindata_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindata };
