import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

/**
 * Updates the Item Maindata Revision's state by demoting it:
 * Review --> Development
 *
 * Used in the Item page's StateFrame, when the current state is Review
 */
async function updateItemMaindataRevisionStateDemoteToDevelopment(
  id: string,
  context: any
) {
  logger.info(
    `graphql > updateItemMaindataRevisionStateDemoteToDevelopment() | args: id: ${id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );
  // TODO: Verify that the user is allowed to make this change
  try {
    /**
     * 1. Get the Item Maindata Revision's current state
     */
    const data1 = await client.query({
      query: gql`
        query getItemMaindataRevisionState($id: uuid!) {
          item_maindata_revisions_by_pk(id: $id) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    console.log(
      'data1.data.item_maindata_revisions_by_pk:',
      data1.data.item_maindata_revisions_by_pk
    );

    const stateIsReview =
      data1.data.item_maindata_revisions_by_pk.state === DataState.Review;
    // console.log('State is review:', stateIsReview);

    // If the state is not in Review, then just return the same data
    if (!stateIsReview) {
      return data1.data.update_item_maindata_revisions_by_pk;
    }

    // Otherwise, if everything is fine, (i.e. state is review), we
    // continue.

    /**
     * 2. Update the Item Maindata Revision's current state
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation updateItemMaindataRevisionState(
          $id: uuid!
          $state: data_states_enum!
        ) {
          update_item_maindata_revisions_by_pk(
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
        state: DataState.Development,
      },
    });

    /**
     * 3. Create an activity entry
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation insertItemMaindataRevisionChange(
          $revision_id: uuid!
          $change_type: data_change_types_enum!
          $to_state: data_states_enum
          $action: data_actions_enum
          $user_id: Int!
        ) {
          insert_item_maindata_revision_changes_one(
            object: {
              item_maindata_revision_id: $revision_id
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
            item_maindata_revision_id
            user_id
          }
        }
      `,
      variables: {
        revision_id: id,
        user_id: context.user.id,
        change_type: DataChangeType.Demotion,
        to_state: DataState.Development,
      },
    });

    // console.log('data3:', data3);

    /**
     * 3. Update the Item entry's `updated_at`
     */
    const data4 = await client.mutate({
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
        id: data1.data.item_maindata_revisions_by_pk.item_id,
      },
    });

    return data2.data.update_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindataRevisionStateDemoteToDevelopment };
