import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateCompanyCount(id: number, count: number) {
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation updateCompanyCount($id: Int!, $count: Int!) {
          update_company_counts_by_pk(
            pk_columns: { id: $id }
            _set: { item_count: $count }
          ) {
            id
            company_id
            item_count
          }
        }
      `,
      variables: {
        id,
        item_count: count,
      },
    });
    return data.data.update_company_counts_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyCount };
