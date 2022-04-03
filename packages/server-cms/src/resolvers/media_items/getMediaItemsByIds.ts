import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getMediaItemsByIds(ids: string[]) {
  logger.info(`graphql > getMediaItemsByIds() | args: ids: ${ids}`);

  try {
    const data = await client.query({
      query: gql`
        query getMediaItemsByIds($ids: [uuid!]) {
          media_items(where: { id: { _in: $ids } }) {
            id
            name
            url
          }
        }
      `,
      variables: {
        ids,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.media_items;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getMediaItemsByIds };
