import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getColourMixPartsMultipleByIds(ids: number[]) {
  try {
    const data = await client.query({
      query: gql`
        query getColourMixPartsMultipleByIds($ids: [Int!]) {
          colour_mix_parts(where: { id: { _in: $ids } }) {
            id
            colour_id
            colour {
              id
              base_colour
              colour_code
              name
            }
            percent
          }
        }
      `,
      variables: {
        ids,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.colour_mix_parts;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getColourMixPartsMultipleByIds };
