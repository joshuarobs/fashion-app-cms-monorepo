import { gql } from '@apollo/client';

const Get_Staff_Users = gql`
  query getStaffUsers {
    getStaffUsers {
      id
      email
      name
      title
      last_online
      avatar_url
    }
  }
`;

export { Get_Staff_Users };
