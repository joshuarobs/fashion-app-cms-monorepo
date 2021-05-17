import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getUniqueItemMaindataRevsForBrandProdOnly(id: number) {
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
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data:', JSON.stringify(data, null, 2));
    return data.data.item_maindata_revisions_aggregate;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getUniqueItemMaindataRevsForBrandProdOnly };
