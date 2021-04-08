import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getStaffUsers() {
  try {
    const data = await client.query({
      query: gql`
        query getStaffUsers {
          staff_users {
            id
            email
            name
            title
            last_online
            avatar_url
          }
        }
      `,
    });
    return data.data.staff_users;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getStaffUsers };
