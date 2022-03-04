import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  DataChangeType,
  DataState,
  ItemType,
  Gender,
} from '@joshuarobs/clothing-framework';

/**
 * A function intended for when adding a new Item's Maindata Revision and
 * its dependents. This is intended for when the user gets an error prompt
 * (on the Item's page) and needs to repair the table structure of an Item.
 *
 * This function should function similar to `insertItem` but without
 * inserting the Item row itself, as it's assumed that it's already added
 * (but has missing dependents that this very function is going to solve).
 * @param id
 * @param name
 * @param item_type
 */
async function addItemMaindataRevisionFixPrompt(
  id: number,
  name: string,
  item_type: ItemType,
  context: any
) {
  logger.info(
    `graphql > addItemMaindataRevisionFixPrompt() :: args: id: ${id} | name: ${name} | item_type: ${item_type} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    // TODO: Ensure that the current user token (not a passed in id since it
    //  can be frauded) has enough permissions to do this action

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

    // Since we are adding a maindata revision for a bugged entry, we assume
    // that there are no existing maindata revisions (this function
    // shouldn't work at all if there are maindata revisions, i.e. nothing
    // to fix)
    if (data1.data.item_maindata_revisions.length > 0) {
      logger.info(
        `graphql > addItemMaindataRevisionFixPrompt() :: Returned early because maindata array length > 0`
      );
      return null;
    }

    /*
     * ============================================================
     * 2. Insert a maindata revision
     * ============================================================
     */
    // TODO: Have this mutation on its own as its shared within `insertItem`
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
        revision: 1,
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
        name,
        type: item_type,
        brand_id: null,
        clothing_shell_id: null,
        for_gender: Gender.All,
        item_family_id: null,
      },
    });

    /*
     * ============================================================
     * 4. Insert a revision change
     * ============================================================
     */
    // TODO: Add an additional change describing that this was done due to
    //  fixing the error by an error fixing prompt (to differentiate it from
    //  being generated naturally)
    const data4 = await client.mutate({
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
        revision_id: data2.data.insert_item_maindata_revisions_one.id,
        user_id: context.user.id,
        change_type: DataChangeType.Promotion,
        to_state: DataState.Development,
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

export { addItemMaindataRevisionFixPrompt };
