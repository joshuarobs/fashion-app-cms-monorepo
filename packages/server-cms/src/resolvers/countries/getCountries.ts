import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCountries() {
  try {
    const data = await client.query({
      query: gql`
        query getCountries {
          countries {
            value
            description
          }
        }
      `,
    });
    return data.data.countries;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCountries };
