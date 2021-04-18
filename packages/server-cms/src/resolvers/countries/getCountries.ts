import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCountries(limit: number, offset: number) {
  try {
    const data = await client.query({
      query: gql`
        query getCountries($limit: Int, $offset: Int) {
          countries(limit: $limit, offset: $offset) {
            value
            description
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
    });
    return data.data.countries;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCountries };
