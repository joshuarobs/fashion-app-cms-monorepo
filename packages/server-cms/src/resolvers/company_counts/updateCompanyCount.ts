import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getUniqueItemMaindataRevsForBrandProdOnly } from '../item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';

/**
 * Updates a Company Count's `item_count` number.
 * @param id - The id of the Company Count.
 * @param count - The value to set.
 * @param loggerPrefix
 */
async function updateCompanyCount(
  id: number,
  count: number,
  // count: number,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > updateCompanyCount() | args: id: ${id}`
  );

  try {
    return null;

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
        id,
        count,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > updateCompanyCount() :: Successfully returned data`
    );
    return data3.data.update_company_counts_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyCount };
