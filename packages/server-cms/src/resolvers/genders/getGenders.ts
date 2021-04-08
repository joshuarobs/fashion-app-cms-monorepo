import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getGenders() {
  try {
    const data = await client.query({
      query: gql`
        query getGenders {
          genders {
            value
            description
          }
        }
      `,
    });
    return data.data.genders;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getGenders };
