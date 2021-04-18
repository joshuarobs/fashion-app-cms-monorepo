import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Get_All_Clothing_Shell_Maindata_Revisions_For_Clothing_Shell_Id } from '../../queries/clothing_shell_maindata_revisions/getLatestProdClothingShellMaindataRevByClothingShellId';
import { SettingsTabView } from '../../components/clothing-shell/settings/SettingsTabView';

interface SettingsProps {
  headerData: any;
}

function ClothingShellSettingsTab({ headerData }: SettingsProps) {
  // @ts-ignore
  const { id } = useParams();
  const clothingShellId = id;

  const {
    loading: loadingProdClothingShellMaindataRev,
    error: errorProdClothingShellMaindataRev,
    data: dataProdClothingShellMaindataRev,
    // refetch: refetchProdItemMaindataRev
  } = useQuery(
    // TODO: getAllClothingShellMaindataRevisionsForClothingShell renamed func
    Get_All_Clothing_Shell_Maindata_Revisions_For_Clothing_Shell_Id,
    {
      variables: { clothingShellId: Number.parseInt(clothingShellId) },
    }
  );

  if (errorProdClothingShellMaindataRev)
    return (
      <div>
        Error ${JSON.stringify(errorProdClothingShellMaindataRev, null, 2)}
      </div>
    );
  if (loadingProdClothingShellMaindataRev) return <div />;
  // return <div>Hey</div>;
  return (
    <SettingsTabView
      headerData={headerData}
      dataProdClothingShellMaindataRev={dataProdClothingShellMaindataRev}
    />
  );
}

export { ClothingShellSettingsTab };
