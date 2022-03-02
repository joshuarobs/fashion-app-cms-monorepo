import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getStaffUserByPk(id: number) {
  try {
    const data = await client.query({
      query: gql`
        query getStaffUserByPk($id: Int!) {
          staff_users_by_pk(id: $id) {
            id
            email
            password
            name
            title
            last_online
            avatar_url
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.staff_users_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getStaffUserByPk };
