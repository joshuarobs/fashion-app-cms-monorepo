import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

async function insertItemMaindataRevisionItemsPage(id: number) {
  logger.info(
    `graphql > insertItemMaindataRevisionItemsPage() | args: id: ${id}`
  );
  const userId = 1;

  try {
    /*
     * ============================================================
     * 1. Get the current most maindata revision and its maindata
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getCurrentMostItemMaindataRevision($id: Int!) {
          item_maindata_revisions(
            where: { item_id: { _eq: $id } }
            order_by: { revision: desc }
            limit: 1
          ) {
            id
            item_id
            revision
            state
            item_maindata {
              id
              name
              type
              brand_id
              clothing_shell_id
              for_gender
              item_family_id
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_maindata_revisions);

    const currentState = data1.data.item_maindata_revisions[0].state;
    const currentRevision = data1.data.item_maindata_revisions[0].revision;
    // console.log('currentState:', currentState);
    console.log('currentRevision:', currentRevision);

    // We will only create a new maindata revision if the current revision
    // is in Production
    if (currentState !== DataState.Production) {
      // return null;
      return data1.data.item_maindata_revisions[0];
    }

    // Get the current revision's maindata
    const { item_maindata } = data1.data.item_maindata_revisions[0];
    console.log('item_maindata:', item_maindata);

    /*
     * ============================================================
     * 2. Insert a maindata revision
     * ============================================================
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation insertItemMaindataRevisionItemsPage(
          $id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_item_maindata_revisions_one(
            object: { item_id: $id, revision: $revision, state: $state }
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
        revision: currentRevision + 1,
        state: DataState.Development,
      },
    });

    // console.log('data2:', data2.data.insert_item_maindata_revisions_one);

    /*
     * ============================================================
     * 3. Insert a maindata for the revision
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation insertItemMaindata(
          $revisionId: uuid!
          $isRelease: Boolean!
          $name: String!
          $type: item_types_enum!
          $brand_id: Int
          $clothing_shell_id: Int
          $for_gender: genders_enum!
          $item_family_id: Int
        ) {
          insert_item_maindata_one(
            object: {
              revision_id: $revisionId
              is_release: $isRelease
              name: $name
              type: $type
              brand_id: $brand_id
              clothing_shell_id: $clothing_shell_id
              for_gender: $for_gender
              item_family_id: $item_family_id
            }
          ) {
            id
            is_release
            name
            type
            brand_id
            clothing_shell_id
            for_gender
            item_family_id
            revision_id
            short_id
            revision {
              item_id
              revision
            }
          }
        }
      `,
      variables: {
        revisionId: data2.data.insert_item_maindata_revisions_one.id,
        isRelease: true,
        name: item_maindata[0].name,
        type: item_maindata[0].type,
        brand_id: item_maindata[0].brand_id,
        clothing_shell_id: item_maindata[0].clothing_shell_id,
        for_gender: item_maindata[0].for_gender,
        item_family_id: item_maindata[0].item_family_id,
      },
    });

    /*
     * ============================================================
     * 4. Insert a revision change
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
        revisionId: data2.data.insert_item_maindata_revisions_one.id,
        userId,
        changeType: DataChangeType.Promotion,
        toState: DataState.Development,
      },
    });

    /*
     * ============================================================
     * 5. Update the item updated_at
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
        id,
      },
    });

    return data2.data.insert_item_maindata_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemMaindataRevisionItemsPage };
