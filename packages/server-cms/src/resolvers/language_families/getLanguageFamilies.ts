import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getLanguageFamilies() {
  try {
    const data = await client.query({
      query: gql`
        query getLanguageFamilies {
          language_families {
            value
            description
          }
        }
      `,
    });
    return data.data.language_families;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getLanguageFamilies };
