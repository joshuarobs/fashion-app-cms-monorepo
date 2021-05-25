import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MiniItemsFrame } from '../../common/frames/MiniItemsFrame';
import { Get_Top_X_Unique_Prod_Items_For_Company_BB } from '../../../queries/item_maindata_revisions/getTopXUniqueProdItemsForCompanyBB';
import { message } from 'antd';
import { Common } from '../../../strings';
import { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only } from '../../../queries/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { Update_Company_Count } from '../../../queries/company_counts/updateCompanyCount';

const key = 'overview-item-frame';

interface MiniItemsFrameCompanyProps {
  company: any;
}

function MiniItemsFrameCompany({ company }: MiniItemsFrameCompanyProps) {
  // Hooks for GraphQL queries
  const [
    updateCompanyCount,
    { loading: loadingUpdCompanyItemCount, error: errorUpdCompanyItemCount },
  ] = useMutation(Update_Company_Count, {
    onCompleted() {},
  });

  const [
    getProductionItemCountForCompany,
    { loading: loadingGetItemCount, error: errorGetItemCount },
  ] = useLazyQuery(Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only, {
    async onCompleted({ item_maindata_revisions_aggregate }) {
      console.log(
        'item_maindata_revisions_aggregate:',
        item_maindata_revisions_aggregate
      );
      await updateCompanyCount({
        variables: {
          id: company.counts.id,
          changes: {
            item_count: item_maindata_revisions_aggregate.aggregate.count,
          },
        },
      });
      message.success({ content: Common.Updated_Item_Count, key }, 2);
    },
  });

  const updateCount = async () => {
    message.loading({ content: Common.Updating_Item_Count, key });
    await getProductionItemCountForCompany({
      variables: {
        id: company.id,
      },
    });
    console.log('after');
  };

  const counts = company.counts ? company.counts : {};

  return (
    <MiniItemsFrame
      id={company.id}
      count={counts.item_count}
      query={Get_Top_X_Unique_Prod_Items_For_Company_BB}
      updateCount={updateCount}
      queryChildObjectName={'getTopXUniqueProdItemsForCompanyBB'}
    />
  );
}

export { MiniItemsFrameCompany };
