import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates a Company. This is typically used when editing an Company on it's
 * Overview page.
 * @param id - The id of the company entry
 * @param changes - The changes to make for the company (e.g. name change)
 * @param loggerPrefix - A string prefix for the logger
 */
async function updateCompany(id: number, changes: any, loggerPrefix = '') {
  logger.info(
    `${loggerPrefix}graphql > updateCompany() | args: id: ${id} | changes: ${JSON.stringify(
      changes,
      null,
      2
    )}`
  );

  // Delete all important fields of the maindata that should not be changed
  delete changes.id;
  delete changes.updated_at;

  const userId = 1;

  try {
    /*
     * ============================================================
     * 1. Mutation to update the Company
     * ============================================================
     */
    const data1 = await client.mutate({
      mutation: gql`
        mutation updateCompany($id: Int!, $changes: companies_set_input) {
          update_companies_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
            name
            website_url
            is_affiliate
            is_reseller
            affiliate_start_date
            logo_url
            short_id
            updated_at
            counts {
              item_count
            }
          }
        }
      `,
      variables: {
        id,
        changes,
      },
    });

    /*
     * ============================================================
     * TODO: 2. Create an activity entry
     * ============================================================
     */
    // const data4 = await client.mutate({
    //   mutation: gql`
    //     mutation insertItemMaindataRevisionChange(
    //       $revisionId: uuid!
    //       $changeType: data_change_types_enum!
    //       $toState: data_states_enum
    //       $action: data_actions_enum
    //       $userId: Int!
    //     ) {
    //       insert_item_maindata_revision_changes_one(
    //         object: {
    //           item_maindata_revision_id: $revisionId
    //           change_type: $changeType
    //           to_state: $toState
    //           action: $action
    //           user_id: $userId
    //         }
    //       ) {
    //         id
    //         date
    //         action
    //         change_type
    //         to_state
    //         item_maindata_revision_id
    //         user_id
    //       }
    //     }
    //   `,
    //   variables: {
    //     revisionId: relatedRevision.id,
    //     userId,
    //     changeType: DataChangeType.Action,
    //     action: DataAction.Update,
    //   },
    // });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertItemMaindataRevisionChange() :: Successfully returned data`
    );
    return data1.data.update_companies_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompany };
