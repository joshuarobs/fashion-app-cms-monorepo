import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the number of unique production items for a given brand/company.
 * This number is useful especially for the end users of the mobile app, but
 * may also benefit staff that seek the same information via the CMS.
 *
 * This is calculated by looking at all `item_maindata_revisions` and
 * aggregating those that are:
 * 1. In state of `Production`
 * 2. Brand (company) matches the given `id`
 *
 * This obviously removes multiple copies of `item_maindata_revisions` that
 * share the same `item_id`.
 *
 * @param id - The company id
 * @param loggerPrefix
 */
async function getUniqueItemMaindataRevsForBrandProdOnly(
  id: number,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > getUniqueItemMaindataRevsForBrandProdOnly() | args: id: ${id}`
  );
  try {
    /*
     * ============================================================
     * 1. Query for the right amount of production items
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getUniqueItemMaindataRevsForBrandProdOnly($id: Int!) {
          item_maindata_revisions_aggregate(
            where: {
              item_maindata: { brand_id: { _eq: $id } }
              state: { _eq: Production }
            }
            distinct_on: item_id
          ) {
            aggregate {
              count
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data:', JSON.stringify(data, null, 2));

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > getUniqueItemMaindataRevsForBrandProdOnly() :: Successfully returned data`
    );
    return data1.data.item_maindata_revisions_aggregate;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getUniqueItemMaindataRevsForBrandProdOnly };
