import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Enums } from '@joshuarobs/clothing-framework';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item page's StateFrame, when the current state is Development
 */
async function updateItemMaindataRevisionStatePromoteToReview(id: string) {
  logger.info(
    `graphql > updateItemMaindataRevisionStatePromoteToReview() | args: id: ${id}`
  );
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

    console.log(
      'State is dev:',
      data1.data.item_maindata_revisions_by_pk.state ===
        Enums.DataState.Development
    );

    return data1.data.update_item_maindata_revisions_by_pk;

    /**
     * 3. Get the Item Maindata Revision's current state
     */
    // const data = await client.query({
    //   query: gql`
    //     mutation updateItemMaindataRevisionState(
    //       $id: uuid!
    //       $state: data_states_enum!
    //     ) {
    //       update_item_maindata_revisions_by_pk(
    //         pk_columns: { id: $id }
    //         _set: { state: Review }
    //       ) {
    //         id
    //         item_id
    //         revision
    //         state
    //       }
    //     }
    //   `,
    //   variables: {
    //     id,
    //   },
    // });
    // return data.data.update_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindataRevisionStatePromoteToReview };
