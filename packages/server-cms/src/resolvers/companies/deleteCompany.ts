/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '../../logger';
import { deleteItemMaindataForItem } from '../item_maindata/deleteItemMaindataForItem';
import { client } from '../../graphql-client';
import { gql } from '@apollo/client';
import { getCompany } from './getCompany';

/**
 * Deletes an Item entry with all of it's required dependent rows
 * (maindata revisions, maindata, revision changes, etc.).
 *
 * This will typically be called from the Settings tab, or on the Item's
 * list page, usually as an admin action.
 * @param id
 */
async function deleteCompany(id: number) {
  logger.info(`graphql > deleteCompany() :: args: id: ${id}`);
  try {
    /*
     * 1. Check for user permission
     */
    // Get the company's data
    const data1company = await getCompany(id);
    console.log('data1company:', data1company);

    // return null;

    /*
     * 2. Delete translations revision changes
     */
    // const data2 = await deleteItemTranslationRevisionChangesForItem(id);
    // console.log('data2:', data2);

    /*
     * 3. Delete translations
     */
    // const data3 = await deleteItemTranslationsForItem(id);
    // console.log('data3:', data3);

    /*
     * 4. Delete translations revisions
     */
    // const data4 = await deleteItemTranslationRevisionsForItem(id);
    // console.log('data4:', data4);

    /*
     * 5. Delete company counts
     */
    if (data1company.counts) {
      const data5 = await client.mutate({
        mutation: gql`
          mutation deleteCompanyCountsByPk($id: Int!) {
            delete_company_counts_by_pk(id: $id) {
              id
              company_id
            }
          }
        `,
        variables: {
          id: data1company.counts.id,
        },
      });
    }

    /*
     * 6. Delete company
     */
    const data6 = await client.mutate({
      mutation: gql`
        mutation deleteCompaniesByPk($id: Int!) {
          delete_companies_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    });
    console.log('data6:', data6);

    /*
     * 7. Delete settings
     */

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(`graphql > deleteCompany() :: Successfully returned data`);
    // return data11.data.delete_items_by_pk;
    return data6.data.delete_companies_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteCompany };
