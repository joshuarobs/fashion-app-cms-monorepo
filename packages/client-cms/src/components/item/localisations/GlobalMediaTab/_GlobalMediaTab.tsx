import React, { useState } from 'react';
import _ from 'lodash';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { ItemGlobalMediaStateFrame } from './ItemGlobalMediaStateFrame';
import { GlobalMediaActivityFrame } from './GlobalMediaActivityFrame';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Layout } from 'antd';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { GlobalMediaFrame } from './GlobalMediaFrame';
import { Get_Item_Global_Media_Revisions_Given_Item_Id } from '../../../../queries/item_global_media_revisions/getItemGlobalMediaRevisionsGivenItemId';
import { Get_Item_Global_Media_Given_Unique_Keys } from '../../../../queries/item_global_media/getItemGlobalMediaGivenUniqueKeys';
import { Get_Media_Items_By_Ids } from '../../../../queries/media_items/getMediaItemsByIds';

const { Content } = Layout;

/**
 * Takes in the database object of Item Global Media, and gets its media
 * objects (e.g. media_1, media_2...) and puts them into an array in their
 * order.
 * @param dataGlobalMedia
 */
function getGlobalMediaIntoArrayFromDatabaseObject(dataGlobalMedia: any) {
  // Convert the globalMedia object's ids into an array
  const globalMediaItems: object[] = [];
  const {
    media_1,
    media_2,
    media_3,
    media_4,
    media_5,
    media_6,
    media_7,
    media_8,
    media_9,
    media_10,
  } = dataGlobalMedia.getItemGlobalMediaGivenUniqueKeys[0];
  // Deep clone each object because the data `globalMediaDraft` which is
  // obtained via an Apollo GraphQL query, is immutable and we can't
  // make any modifications.
  // ReactSortableJS bugs out if the data in the entries list are immutable
  if (media_1) globalMediaItems.push({ ...media_1 });
  if (media_2) globalMediaItems.push({ ...media_2 });
  if (media_3) globalMediaItems.push({ ...media_3 });
  if (media_4) globalMediaItems.push({ ...media_4 });
  if (media_5) globalMediaItems.push({ ...media_5 });
  if (media_6) globalMediaItems.push({ ...media_6 });
  if (media_7) globalMediaItems.push({ ...media_7 });
  if (media_8) globalMediaItems.push({ ...media_8 });
  if (media_9) globalMediaItems.push({ ...media_9 });
  if (media_10) globalMediaItems.push({ ...media_10 });
  // console.log('123#globalMediaItems11:', globalMediaItems);
  return globalMediaItems;
}

interface GlobalMediaTabProps {
  itemId?: string;
  currentTab: string;
  defaultMediaItemAssociated: [];
  // currentRevision: any;
  // setHasChangesMade: Function;
  paramsRevision: any;
  paramsIsRelease: string;
  location: any;
  refetchItemTransRevs: Function;
}

// https://reacttraining.com/blog/react-context-with-typescript/

interface GlobalMediaTabContextValues {
  mediaAllGenders: any[];
  setMediaAllGenders: Function;
  prevMediaAllGenders: any[];
  setPrevMediaAllGenders: Function;
  discardChanges: Function;
}

const GlobalMediaTabContext = React.createContext<
  GlobalMediaTabContextValues | undefined
>(undefined);

function useGlobalMediaTabContext() {
  const context = React.useContext(GlobalMediaTabContext);
  // If context is undefined, we know we used RadioGroupItem
  // outside our provider, so we can throw a more helpful error!
  if (context === undefined) {
    throw Error(
      'GlobalMediaTabItem must be used inside of a GlobalMediaTab, ' +
        'otherwise it will not function correctly. See: ' +
        'https://reacttraining.com/blog/react-context-with-typescript/'
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
}

function GlobalMediaTab({
  itemId,
  currentTab,
  defaultMediaItemAssociated,
  // currentRevision,
  // setHasChangesMade,
  paramsRevision,
  paramsIsRelease,
  location,
  refetchItemTransRevs,
}: GlobalMediaTabProps) {
  // `paramsIsRelease` in boolean form, since the parameter in the url is in
  // string form
  const paramsIsReleaseBool = paramsIsRelease === 'true';

  const [mediaAllGendersDraft, setMediaAllGendersDraft] = useState<any[]>([]);
  const [prevMediaAllGendersDraft, setPrevMediaAllGendersDraft] = useState<
    any[]
  >([]);
  const [mediaAllGendersRelease, setMediaAllGendersRelease] = useState<any[]>(
    []
  );
  const [prevMediaAllGendersRelease, setPrevMediaAllGendersRelease] = useState<
    any[]
  >([]);

  const {
    loading: loadingGlobalMedia,
    error: errorGlobalMedia,
    data: dataGlobalMedia,
    refetch: refetchGlobalMedia,
  } = useQuery(Get_Item_Global_Media_Given_Unique_Keys, {
    variables: {
      // revisionId: paramsRevisionId
      revision: Number.parseInt(paramsRevision),
      item_id: Number.parseInt(String(itemId)),
    },
    onCompleted: async () => {
      console.error('@@');
      console.log(
        'GlobalMediaTab#onCompleted - dataGlobalMedia:',
        dataGlobalMedia
      );
      // Convert the globalMedia object's ids into an array
      const globalMediaItems11: object[] = [];
      const {
        media_1,
        media_2,
        media_3,
        media_4,
        media_5,
        media_6,
        media_7,
        media_8,
        media_9,
        media_10,
      } = dataGlobalMedia.getItemGlobalMediaGivenUniqueKeys[0];
      // Deep clone each object because the data `globalMediaDraft` which is
      // obtained via an Apollo GraphQL query, is immutable and we can't
      // make any modifications.
      // ReactSortableJS bugs out if the data in the entries list are immutable
      if (media_1) globalMediaItems11.push({ ...media_1 });
      if (media_2) globalMediaItems11.push({ ...media_2 });
      if (media_3) globalMediaItems11.push({ ...media_3 });
      if (media_4) globalMediaItems11.push({ ...media_4 });
      if (media_5) globalMediaItems11.push({ ...media_5 });
      if (media_6) globalMediaItems11.push({ ...media_6 });
      if (media_7) globalMediaItems11.push({ ...media_7 });
      if (media_8) globalMediaItems11.push({ ...media_8 });
      if (media_9) globalMediaItems11.push({ ...media_9 });
      if (media_10) globalMediaItems11.push({ ...media_10 });
      console.log('globalMediaItems11:', globalMediaItems11);

      console.log('globalMediaDraft:', mediaAllGendersDraft);
      console.log(
        'globalMediaDraft.length === 0:',
        mediaAllGendersDraft.length === 0
      );
      if (mediaAllGendersDraft.length === 0) {
        setMediaAllGendersDraft(globalMediaItems11);
        setPrevMediaAllGendersDraft(globalMediaItems11);
      }
    },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Item_Global_Media_Revisions_Given_Item_Id, {
    variables: {
      item_id: Number.parseInt(String(itemId)),
    },
    fetchPolicy: 'network-only',
  });

  const [
    getMediaItemsByIds,
    {
      loading: loadingMediaItemsByIds,
      error: errorMediaItemsByIds,
      data: dataMediaItemsByIds,
    },
  ] = useLazyQuery(Get_Media_Items_By_Ids, {
    // variables: { ids: mediaItemIds },
    fetchPolicy: 'network-only',
  });

  // useEffect(() => {
  //   getMediaItemsByIds();
  // }, []);
  function discardChangesDraft() {
    setMediaAllGendersDraft(prevMediaAllGendersDraft);
  }

  function discardChangesRelease() {
    setMediaAllGendersRelease(prevMediaAllGendersRelease);
  }

  async function refetchMediaItemsByIds(
    ids: string[],
    isRelease: boolean,
    isSave: boolean
  ) {
    // 1. Query data of all the new ids
    const query = await getMediaItemsByIds({
      variables: {
        ids,
      },
    });
    console.log('ids:', ids, 'query:', query, 'isRelease:', isRelease);
    console.log('!!test:', query.data.getMediaItemsByIds);

    if (query) {
      // 2. Sort them, by keeping the original order, then appending the new
      // ids by alphabetical order
      // This is needed because the query to get media by list of ids, will
      // return them all in order of their name, which breaks the order set by
      // the user
      // Sort algorithm from:
      // https://stackoverflow.com/questions/28719795/lodash-sort-collection-based-on-external-array
      // const currentIds = globalMediaDraft.map(({ id }) => id);
      const currentIds = ids;

      if (isRelease) {
        setMediaAllGendersRelease(query.data.getMediaItemsByIds);
        if (isSave)
          setPrevMediaAllGendersRelease(query.data.getMediaItemsByIds);
      } else {
        const last = mediaAllGendersDraft.length;

        const sortedCollection = _.sortBy(
          query.data.getMediaItemsByIds,
          (entry) => {
            return currentIds.indexOf(entry.id) !== -1
              ? currentIds.indexOf(entry.id)
              : last;
          }
        );

        console.log('@@sortedCollection:', sortedCollection);

        // setGlobalMediaDraft(query.data.getMediaItemsByIds);
        setMediaAllGendersDraft(sortedCollection);
        if (isSave) setPrevMediaAllGendersDraft(sortedCollection);
      }
    }
  }

  let mainFrameToDisplay = null;
  let stateFrameToDisplay = null;

  if (errorGlobalMedia) {
    mainFrameToDisplay = (
      <div>{`Error! (Global Media) ${JSON.stringify(
        errorGlobalMedia,
        null,
        2
      )}`}</div>
    );
  } else if (errorRevisions) {
    mainFrameToDisplay = (
      <div>{`Error! (Revisions)${JSON.stringify(
        errorRevisions,
        null,
        2
      )}`}</div>
    );
  } else if (errorMediaItemsByIds) {
    mainFrameToDisplay = (
      <div>{`Error! (Media Items By Ids)${JSON.stringify(
        errorMediaItemsByIds,
        null,
        2
      )}`}</div>
    );
  }

  if (loadingGlobalMedia || loadingRevisions || !mediaAllGendersDraft) {
    mainFrameToDisplay = (
      <Content
        style={{
          background: '#fff',
          minWidth: 586,
          minHeight: 400,
        }}
      />
    );
    stateFrameToDisplay = <StateFrame />;
  } else {
    // console.log('else');
    console.log('dataRevisions:', dataRevisions);
    console.log('dataGlobalMedia:', dataGlobalMedia);
    const globalMedia = dataGlobalMedia.getItemGlobalMediaGivenUniqueKeys;
    console.log('globalMedia!!!:', globalMedia);

    const uniqueRevisions =
      dataRevisions.getItemGlobalMediaRevisionsGivenItemId;

    // console.error("translations!:", translations);
    mainFrameToDisplay = (
      <GlobalMediaFrame
        // translation={translation}
        globalMediaDraft={globalMedia[0] ? globalMedia[0] : null}
        globalMediaRelease={globalMedia[1] ? globalMedia[1] : null}
        revisionIdDraft={globalMedia[0].id}
        revisionIdRelease={globalMedia[1] ? globalMedia[1].id : null}
        // globalMediaDraft={mediaAllGendersDraft}
        // prevGlobalMediaDraft={prevMediaAllGendersDraft}
        // globalMediaRelease={mediaAllGendersRelease}
        // prevGlobalMediaRelease={prevMediaAllGendersRelease}
        defaultMediaItemAssociated={defaultMediaItemAssociated}
        // setGlobalMediaDraft={setMediaAllGendersDraft}
        // setGlobalMediaRelease={setMediaAllGendersRelease}
        // setPrevGlobalMediaDraft={setPrevMediaAllGendersDraft}
        // setPrevGlobalMediaRelease={setPrevMediaAllGendersRelease}
        itemId={itemId}
        currentTab={currentTab}
        // currentRevision={currentRevision}
        location={location}
        translationRevision={uniqueRevisions[0] ? uniqueRevisions[0] : null}
        refetchMediaItemsByIds={refetchMediaItemsByIds}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        uniqueRevisions={uniqueRevisions}
        refetchRevisions={refetchRevisions}
        // refetchTranslations={refetchGlobalMedia}
      />
      // <div>test</div>
    );
    stateFrameToDisplay = (
      <ItemGlobalMediaStateFrame
        currentTab={currentTab}
        // currentRevision={currentRevision}
        // translations={translations}
        itemId={itemId}
        paramsRevision={paramsRevision}
        refetchTranslations={refetchGlobalMedia}
        refetchItemTransRevs={refetchItemTransRevs}
        uniqueRevisions={[]}
        refetchUniqueRevisions={() => {}}
      />
    );
  }

  return (
    <>
      <ColumnOfFrames freeWidth>
        {/* @ts-ignore */}
        <GlobalMediaTabContext.Provider
          value={{
            mediaAllGenders: paramsIsReleaseBool
              ? mediaAllGendersRelease
              : mediaAllGendersDraft,
            setMediaAllGenders: paramsIsReleaseBool
              ? setMediaAllGendersRelease
              : setMediaAllGendersDraft,
            prevMediaAllGenders: paramsIsReleaseBool
              ? prevMediaAllGendersRelease
              : prevMediaAllGendersDraft,
            setPrevMediaAllGenders: paramsIsReleaseBool
              ? setPrevMediaAllGendersRelease
              : setPrevMediaAllGendersDraft,
            discardChanges: paramsIsReleaseBool
              ? discardChangesRelease
              : discardChangesDraft,
          }}
        >
          {mainFrameToDisplay}
        </GlobalMediaTabContext.Provider>
      </ColumnOfFrames>
      <ColumnOfFrames>
        {stateFrameToDisplay}
        <GlobalMediaActivityFrame currentTab={currentTab} itemId={itemId} />
      </ColumnOfFrames>
    </>
  );
}

export { GlobalMediaTab, useGlobalMediaTabContext };
