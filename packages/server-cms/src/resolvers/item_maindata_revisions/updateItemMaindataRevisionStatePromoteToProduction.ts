import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';
import { getUniqueItemMaindataRevsForBrandProdOnly } from './getUniqueItemMaindataRevisionsForBrandInProduction';
import { updateCompanyCount } from '../company_counts/updateCompanyCount';
import { insertItemMaindataRevisionChangePromoRetired } from '../item_maindata_revision_changes/insertItemMaindataRevisionChangePromoRetired';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item page's StateFrame, when the current state is Development
 */
async function updateItemMaindataRevisionStatePromoteToProduction(
  id: string,
  userId: number
) {
  logger.info(
    `graphql > updateItemMaindataRevisionStatePromoteToProduction() | args: id: ${id} | userId: ${userId}`
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
            item_maindata {
              id
              brand_id
              brand {
                id
                counts {
                  id
                }
              }
            }
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

    const { item_maindata } = data1.data.item_maindata_revisions_by_pk;

    const stateIsReview =
      data1.data.item_maindata_revisions_by_pk.state === DataState.Review;
    // console.log('State is review:', stateIsReview);

    // return data1.data.update_item_maindata_revisions_by_pk;

    // If the state is not in Review, then just return the same data
    if (!stateIsReview) {
      return data1.data.update_item_maindata_revisions_by_pk;
    }

    // Otherwise, if everything is fine, (i.e. state is review), we continue.

    /**
     * 2. Update the Item Maindata Revision's current state
     */
    // const data2 = await client.mutate({
    //   mutation: gql`
    //     mutation updateItemMaindataRevisionState(
    //       $id: uuid!
    //       $state: data_states_enum!
    //     ) {
    //       update_item_maindata_revisions_by_pk(
    //         pk_columns: { id: $id }
    //         _set: { state: $state }
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
    //     state: DataState.Production,
    //   },
    // });

    /**
     * 3. If there is a previous revision, retire it
     */
    // const matchingPreviousRevision = uniqueRevisions.find(
    //   // @ts-ignore
    //   ({ revision }) => revision === Number.parseInt(paramsRevision) - 1
    // );
    // console.log("matchingPreviousRevision:", matchingPreviousRevision);
    // TODO
    // if (matchingPreviousRevision) {
    //   await updateItemMaindataRevisionToRetired({
    //     variables: {
    //       revisionId: matchingPreviousRevision.id,
    //     },
    //   });
    //   await insertItemMaindataRevisionChangePromoRetired({
    //     variables: {
    //       revisionId: matchingPreviousRevision.id,
    //       userId: 1,
    //     },
    //   });
    // }

    return data1.data.update_item_maindata_revisions_by_pk;

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
        toState: DataState.Production,
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

    /**
     * 4. Update the related Company's item count
     */
    const brand_id = item_maindata[0] ? item_maindata[0].brand_id : null;
    console.log('brand_id:', brand_id);

    if (brand_id) {
      const data6 = await getUniqueItemMaindataRevsForBrandProdOnly(brand_id);
      console.log('data6:', data6);
      const { count } = data6.aggregate;
      console.log('count:', count);

      let counts_id = null;
      if (
        item_maindata[0] &&
        item_maindata[0].brand &&
        item_maindata[0].brand.counts
      ) {
        counts_id = item_maindata[0].brand.counts.id;
        console.log('counts_id:', counts_id);
        const data7 = await updateCompanyCount(counts_id, count + 1);
        console.log('data7:', data7);
      }
    }

    return data2.data.update_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindataRevisionStatePromoteToProduction };
