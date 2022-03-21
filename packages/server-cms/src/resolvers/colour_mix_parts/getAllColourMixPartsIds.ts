import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets all colour mix parts, but only their ids.
 *
 * This is to be used when adding a new Fabric Layer, within the select
 * colour mix parts popup.
 * @param context - Apollo context
 */
async function getAllColourMixPartsIds(context: any) {
  try {
    const data = await client.query({
      query: gql`
        query getAllColourMixPartsIds {
          colour_mix_parts(order_by: { id: asc }) {
            id
          }
        }
      `,
      variables: {},
      fetchPolicy: 'network-only',
    });
    return data.data.colour_mix_parts;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getAllColourMixPartsIds };
