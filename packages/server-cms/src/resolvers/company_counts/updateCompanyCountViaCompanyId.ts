import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getUniqueItemMaindataRevsForBrandProdOnly } from '../item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';

/**
 * Updates a Company Count's `item_count` number. The Company Count row id
 * is unknown in this case, therefore we obtain it via an Item (from the id
 * argument)
 * @param id - The id of the Item that we want to find it's `company_count` row.
 * @param loggerPrefix
 */
async function updateCompanyCountViaCompanyId(
  id: number,
  // count: number,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > updateCompanyCountViaCompanyId() | args: id: ${id}`
  );

  try {
    /*
     * ============================================================
     * 1. Query relevant info about the Company
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getCompanyBBForUpdatingCounts($id: Int!) {
          companies_by_pk(id: $id) {
            id
            counts {
              id
              company_id
              item_count
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data1:', JSON.stringify(data1, null, 2));
    const companyCounts = data1.data.companies_by_pk.counts;
    // console.log('companyCounts:', companyCounts);

    /*
     * ============================================================
     * 2. Query for the right amount of production items
     * ============================================================
     */
    const data2 = await getUniqueItemMaindataRevsForBrandProdOnly(id, '--');
    // console.log('data2:', data2);
    const count = data2.aggregate.count;
    // const count = 8;
    // console.log('count:', count);

    // If there are no changes in the counts, i.e. previous counts ===
    // proposed counts, then just return the original data
    // This can save us from a redundant mutation call that does nothing
    if (companyCounts.item_count === count) {
      logger.info(
        `${loggerPrefix}graphql > updateCompanyCountViaCompanyId() :: 2.a - Early exit returning prev data because of same item count (${count})`
      );
      // return companyCounts;
      return null;
    }

    /*
     * ============================================================
     * 3. Mutation to update the Company
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateCompanyCount($id: Int!, $count: Int!) {
          update_company_counts_by_pk(
            pk_columns: { id: $id }
            _set: { item_count: $count }
          ) {
            id
            company_id
            item_count
          }
        }
      `,
      variables: {
        id: companyCounts.id,
        count,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > updateCompanyCountViaCompanyId() :: Successfully returned data`
    );
    return data3.data.update_company_counts_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyCountViaCompanyId };
