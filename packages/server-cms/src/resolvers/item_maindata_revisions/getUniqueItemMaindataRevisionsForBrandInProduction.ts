import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getUniqueItemMaindataRevsForBrandProdOnly() {
  try {
    const data = await client.query({
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
    });
    return data.data.item_maindata_revisions_aggregate;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getUniqueItemMaindataRevsForBrandProdOnly };
