import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getLocales() {
  try {
    const data = await client.query({
      query: gql`
        query getLocales {
          locales {
            code
            name
            language {
              description
            }
            country {
              description
            }
          }
        }
      `,
    });
    return data.data.locales;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getLocales };
