import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Creates a new clothing shell maindata with any or all of its specified
 * values.
 * @param input
 */
async function insertClothingShellMaindata(input: any) {
  const loggerPrefix = '';
  logger.info(
    `${loggerPrefix}graphql > insertClothingShellMaindata() :: args: input: ${JSON.stringify(
      input,
      null,
      2
    )}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertClothingShellMaindata(
          $object: clothing_shell_maindata_insert_input!
        ) {
          insert_clothing_shell_maindata_one(object: $object) {
            id
            revision_id
            is_release
            name
            item_type
            uniform_thickness
            default_shell_layer_id
            default_fill_layer_id
            default_lining_layer_id
            default_interlining_layer_id
            clothing_segment_data_id
            revision {
              clothing_shell_id
              revision
            }
          }
        }
      `,
      variables: {
        object: input,
      },
    });
    logger.info(
      `${loggerPrefix}graphql > insertClothingShellMaindata() :: Successfully returned data`
    );
    return data.data.insert_clothing_shell_maindata_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindata };
