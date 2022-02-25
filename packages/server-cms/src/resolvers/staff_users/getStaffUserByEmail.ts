import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getStaffUserByEmail(email: string) {
  logger.info(`graphql > getStaffUserByEmail() :: args: email: ${email}`);

  try {
    const data = await client.query({
      query: gql`
        query getStaffUserByEmail($email: String!) {
          staff_users(where: { email: { _eq: $email } }) {
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
        email,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.staff_users;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getStaffUserByEmail };
