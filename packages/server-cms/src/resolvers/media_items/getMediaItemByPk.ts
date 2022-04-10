import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getMediaItemByPk(id: string) {
  logger.info(`graphql > getMediaItemByPk() | args: id: ${id}`);

  try {
    const data = await client.query({
      query: gql`
        query getMediaItemByPk($id: uuid!) {
          media_items(where: { id: { _eq: $id } }) {
            id
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.media_items;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getMediaItemByPk };
