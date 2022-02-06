import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';
import { updateCompanyCountViaCompanyId } from '../company_counts/updateCompanyCountViaCompanyId';
import { Logger_Prefix_Sub_Level_1 } from '../../settings';

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
    /* ============================================================
     * 1. Get the Item Maindata Revision's current state
     * ============================================================
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

    const { item_id, item_maindata } = data1.data.item_maindata_revisions_by_pk;

    const stateIsReview =
      data1.data.item_maindata_revisions_by_pk.state === DataState.Review;
    // console.log('State is review:', stateIsReview);

    // return data1.data.update_item_maindata_revisions_by_pk;

    /*
     * Get information about the related item maindata revisions
     * (potentially including this one already)
     */
    const data1a = await client.query({
      query: gql`
        query getRevisionsForItemBarebonesLatestTwo($id: Int!) {
          item_maindata_revisions(
            where: { item_id: { _eq: $id } }
            order_by: { revision: desc }
            limit: 2
          ) {
            id
            revision
            state
          }
        }
      `,
      variables: {
        id: item_id,
      },
      fetchPolicy: 'network-only',
    });
    console.log('data1a:', data1a.data.item_maindata_revisions);

    // TODO: Only allow if this is the latest revision
    const latestRevision = data1a.data.item_maindata_revisions[0];
    const isLatestRevision = id === latestRevision.id;
    console.log('isLatestRevision:', isLatestRevision);

    /*
     * Return the same data if:
     * 1. State is NOT === Review
     * 2. Is NOT the latest revision
     */
    if (!stateIsReview || !isLatestRevision) {
      return data1.data.update_item_maindata_revisions_by_pk;
    }

    // Otherwise, if everything is fine, (i.e. state is review), we continue.

    /* ============================================================
     * 2. Update the Item Maindata Revision's current state
     * ============================================================
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
        state: DataState.Production,
      },
    });

    /* ============================================================
     * 3. If there is a previous revision, retire it
     * ============================================================
     */
    if (data1a.data.item_maindata_revisions.length > 1) {
      const previousRevision = data1a.data.item_maindata_revisions[1];

      /** Update state of previous revision to retired */
      const data3a = await client.mutate({
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
          id: previousRevision.id,
          state: DataState.Retired,
        },
      });

      /* Insert a revision change indicating a promotion to retired */
      const data3b = await client.mutate({
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
          revisionId: previousRevision.id,
          userId,
          changeType: DataChangeType.Promotion,
          toState: DataState.Retired,
        },
      });
    }

    /* ============================================================
     * 4. Create an activity entry
     * ============================================================
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
        revisionId: id,
        userId,
        changeType: DataChangeType.Promotion,
        toState: DataState.Production,
      },
    });

    console.log('data4:', data4);

    // return data1.data.update_item_maindata_revisions_by_pk;

    /* ============================================================
     * 5. Update the Item entry's `updated_at`
     * ============================================================
     */
    const data5 = await client.mutate({
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

    /* ============================================================
     * 6. Update the related Company's item count
     * ============================================================
     */
    const brand_id = item_maindata[0] ? item_maindata[0].brand_id : null;
    console.log('brand_id:', brand_id);

    if (brand_id) {
      // const data6 = await getUniqueItemMaindataRevsForBrandProdOnly(brand_id);
      const data6 = await updateCompanyCountViaCompanyId(
        brand_id,
        Logger_Prefix_Sub_Level_1
      );
      console.log('data6:', data6);
      // const { count } = data6.aggregate;
      // console.log('count:', count);
      //
      // let counts_id = null;
      // if (
      //   item_maindata[0] &&
      //   item_maindata[0].brand &&
      //   item_maindata[0].brand.counts
      // ) {
      //   counts_id = item_maindata[0].brand.counts.id;
      //   console.log('counts_id:', counts_id);
      //   const data7 = await updateCompanyCountViaCompanyId(
      //     counts_id,
      //     count + 1
      //   );
      //   console.log('data7:', data7);
      // }
    }

    return data2.data.update_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindataRevisionStatePromoteToProduction };
