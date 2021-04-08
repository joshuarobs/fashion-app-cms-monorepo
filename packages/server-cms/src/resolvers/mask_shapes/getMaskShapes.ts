import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getMaskShapes() {
  try {
    const data = await client.query({
      query: gql`
        query getMaskShapes {
          body_segment_mask_shapes {
            value
            description
          }
        }
      `,
    });
    return data.data.body_segment_mask_shapes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getMaskShapes };
