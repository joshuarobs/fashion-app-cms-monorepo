import React from 'react';
import { SettingsTabView } from '../../components/item/settings/SettingsTabView';
import { useQuery } from '@apollo/client';
import { Get_Latest_Production_Item_Maindata_Revision_By_Item_Id } from '../../queries/item_maindata_revisions/getLatestProdItemMaindataRevByItemId';
import { useParams } from 'react-router-dom';

interface SettingsProps {
  headerData: any;
}

function ItemSettingsTab({ headerData }: SettingsProps) {
  // @ts-ignore
  const { id } = useParams();
  const itemId = id;

  const {
    loading: loadingProdItemMaindataRev,
    error: errorProdItemMaindataRev,
    data: dataProdItemMaindataRev,
    // refetch: refetchProdItemMaindataRev
  } = useQuery(Get_Latest_Production_Item_Maindata_Revision_By_Item_Id, {
    variables: { itemId },
  });

  if (errorProdItemMaindataRev)
    return <div>Error ${errorProdItemMaindataRev}</div>;
  if (loadingProdItemMaindataRev) return <div />;
  return (
    <SettingsTabView
      headerData={headerData}
      dataProdItemMaindataRev={dataProdItemMaindataRev}
    />
  );
}

export { ItemSettingsTab };
