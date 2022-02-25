import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertStaffUser(object: any) {
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertStaffUser($object: staff_users_insert_input!) {
          insert_staff_users_one(object: $object) {
            id
            email
            name
            title
            last_online
            avatar_url
          }
        }
      `,
      variables: {
        object,
      },
    });
    return data.data.insert_staff_users_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertStaffUser };
