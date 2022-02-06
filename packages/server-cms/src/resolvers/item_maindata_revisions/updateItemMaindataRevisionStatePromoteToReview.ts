import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item page's StateFrame, when the current state is Development
 */
async function updateItemMaindataRevisionStatePromoteToReview(
  id: string,
  userId: number
) {
  logger.info(
    `graphql > updateItemMaindataRevisionStatePromoteToReview() | args: id: ${id} | userId: ${userId}`
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

    const stateIsDevelopment =
      data1.data.item_maindata_revisions_by_pk.state === DataState.Development;
    // console.log('State is development:', stateIsDevelopment);

    // If the state is not in Development, then just return the same data
    if (!stateIsDevelopment) {
      return data1.data.update_item_maindata_revisions_by_pk;
    }

    // Otherwise, if everything is fine, (i.e. state is development), we
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
        state: DataState.Review,
      },
    });

    /**
     * 3. Create an activity entry
     */
    const data3 = await client.mutate({
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
        revisionId: id,
        userId,
        changeType: DataChangeType.Promotion,
        toState: DataState.Review,
      },
    });

    console.log('data3:', data3);

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

export { updateItemMaindataRevisionStatePromoteToReview };
