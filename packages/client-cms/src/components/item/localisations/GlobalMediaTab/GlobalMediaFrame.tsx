import React, { CSSProperties, useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
  DataChangeType,
  DataAction,
  DataState,
} from '@joshuarobs/clothing-framework';
import { Col, Layout, message, Row, Tabs, Select } from 'antd';
import { Common } from '../../../../strings';
import { UnsavedChangesCard } from '../../../common/UnsavedChangesCard';
import { FrameTitle } from '../../../common/typography/FrameTitle';
import { TabContentFrame } from './TabContentFrame';
import { TagInDevelopment } from '../../../common/localisation/TagInDevelopment';
import { TagInProduction } from '../../../common/localisation/TagInProduction';
import { TagInReview } from '../../../common/localisation/TagInReview';
import { TagInRetirement } from '../../../common/localisation/TagInRetirement';
import { TitleAndValue } from '../../../common/TitleAndValue';
import { ErrorPleaseFixThis } from '../../../common/localisation/ErrorPleaseFixThis';
import { LocaleStateDot } from '../../../common/localisation/LocaleStateDot';
import { BurgerMenuButton } from '../../../common/frames/BurgerMenuButton/_BurgerMenuButton';
import { getSomePartsOfUrl } from '../../../../utils/getSomePartsOfUrl';
import { Insert_Item_Translation_Revision_Change } from '../../../../queries/item_translation_revision_changes/insertItemTranslationRevisionChange';
import { Delete_Item_Translations_For_Revision } from '../../../../queries/item_translations/deleteItemTranslationForRevision';
import { Delete_Item_Translation_Revision_Changes_For_Revision } from '../../../../queries/item_translation_revision_changes/deleteItemTranslationRevisionChangeForRevision';
import { Delete_Item_Translation_Revision } from '../../../../queries/item_translation_revisions/deleteItemTranslationRevision';
import { Update_Item_Updated_At } from '../../../../queries/items/updateItemUpdatedAt';
import { Update_Item_Translation } from '../../../../queries/item_translations/updateItemTranslation';
import { Get_Item_Maindata_Revision_Changes } from '../../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { Get_Item_Translation_Revision_Changes } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';
import { Get_Item_Translation_Revision_Changes_For_Locale } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';
import { Delete_Item_Translation_Revision_Locale_Page } from '../../../../queries/item_translation_revisions/deleteItemTranslationRevisionLocalePage';
import { Get_Item_Translation_Revisions } from '../../../../queries/item_translation_revisions/getItemTranslationRevisions';
import { PictureOutlined } from '@ant-design/icons';
import { SelectMediaModal } from './SelectMediaModal/_SelectMediaModal';
import { Update_Item_Global_Media } from '../../../../queries/item_global_media/updateItemGlobalMedia';
import { Get_Item_Global_Media_Revision_Changes_Given_Item_Id } from '../../../../queries/item_global_media_revision_changes/getItemGlobalMediaRevisionChangesGivenItemId';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

// const size = "small";

const key = 'unsaved-changes-localisations';

interface GlobalMediaFrameProps {
  currentTab: any;
  globalMediaDraft: any;
  globalMediaRelease: any;
  defaultMediaItemAssociated: [];
  itemId?: string;
  location: any;
  translationRevision: any;
  paramsRevision: any;
  paramsIsRelease: string;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchTranslations: Function;
}

function GlobalMediaFrame({
  currentTab,
  // currentRevision,
  globalMediaDraft,
  globalMediaRelease,
  defaultMediaItemAssociated,
  itemId,
  location,
  translationRevision,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  refetchRevisions,
}: // refetchTranslations,
GlobalMediaFrameProps) {
  // console.log("Current tab:", currentTab);
  // console.log("location:", location);
  // console.log("translationRevision:", translationRevision);
  // console.log("TRANSLATION DRAFT:", translationDraft);
  // console.log("TRANSLATION RELEASE:", translationRelease);
  const navigate = useNavigate();
  const localisationsUrl = getSomePartsOfUrl(location.pathname, 6);

  console.log('paramsRevision:', paramsRevision);

  const [currentRevision, setCurrentRevision] = useState(uniqueRevisions[0]);
  const [state, setState] = useState(null);
  const [revision_id, setRevisionId] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === Number.parseInt(paramsRevision)
    );
    console.log(
      'matchingRevision:',
      matchingRevision,
      '\nparamsRevision:',
      paramsRevision
    );
    if (matchingRevision) {
      setCurrentRevision(matchingRevision);
      // setState(currentRevision ? currentRevision.state : null);
      setState(matchingRevision ? matchingRevision.state : null);
      setRevisionId(matchingRevision ? matchingRevision.id : null);
      console.log(
        'SET CURRENT REVISION:',
        currentRevision,
        '\nParams:',
        paramsRevision,
        '\nMatching revision:',
        matchingRevision,
        '\nUnique revs:',
        uniqueRevisions
      );
    }
  }, [currentTab, paramsRevision, uniqueRevisions]);

  // useEffect(() => {
  //   setState(currentRevision ? currentRevision.state : null);
  // }, [paramsRevision]);

  // const state = currentRevision ? currentRevision.state : null;
  console.log('currentRevision:', currentRevision);

  // console.log("State:", state);

  // console.log("uniqueRevisions:", uniqueRevisions);
  // The latest revision number
  const latestRevision = uniqueRevisions[0].revision;

  // `paramsIsRelease` in boolean form, since the parameter in the url is in
  // string form
  const paramsIsReleaseBool = paramsIsRelease === 'true';

  // STATES FOR THE DRAFT TRANSLATIONS
  const [description1, setDescription1] = useState();
  // const [mediaAllGenderIds1, setMediaAllGenderIds1] = useState<string[]>([]);
  // The initial version of the draft's media all gender ids
  // const [prevMediaAllGenderIds1, setPrevMediaAllGenderIds1] = useState<
  //   string[]
  // >([]);
  const [mediaAllGenders1, setMediaAllGenders1] = useState<any[]>([]);
  const [prevMediaAllGenders1, setPrevMediaAllGenders1] = useState<object[]>(
    []
  );

  // STATES FOR THE RELEASE TRANSLATIONS
  const [full_name2, setFullName2] = useState();
  const [short_name2, setShortName2] = useState();
  const [description2, setDescription2] = useState();
  const [mediaAllGenderIds2, setMediaAllGenderIds2] = useState<string[]>([]);
  const [mediaItems2, setMediaItems2] = useState<object[]>([]);
  const [mediaAllGenders2, setMediaAllGenders2] = useState<object[]>([]);
  const [prevMediaAllGenders2, setPrevMediaAllGenders2] = useState<object[]>(
    []
  );

  useEffect(() => {
    // Convert the globalMedia object's ids into an array
    const globalMediaItems: object[] = [];
    if (globalMediaDraft) {
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
      } = globalMediaDraft;
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
      console.log('globalMediaItems:', globalMediaItems);
    }
    // console.log('media_1:', globalMediaDraft.media_1);
    // globalMediaDraft.media_1.x = 1;

    // setMediaAllGenderIds1(globalMediaDraft ? globalMediaItems : []);
    setMediaAllGenders1(globalMediaDraft ? globalMediaItems : []);
    // Set the previous (current database) version of the media as the same
    // as the current react one
    // setPrevMediaAllGenderIds1(globalMediaDraft ? arrayOfIds : []);
    setPrevMediaAllGenders1(globalMediaDraft ? globalMediaItems : []);
    // setDescription1(translationDraft ? translationDraft.description : null);
    //
    // if (translationRelease) {
    //   setFullName2(translationRelease.full_name);
    // } else if (translationDraft) {
    //   setFullName2(translationDraft.full_name);
    // }
    //
    // if (translationRelease) {
    //   setShortName2(translationRelease.short_name);
    // } else if (translationDraft) {
    //   setShortName2(translationDraft.short_name);
    // }
    //
    // if (translationRelease) {
    //   setDescription2(translationRelease.description);
    // } else if (translationDraft) {
    //   setDescription2(translationDraft.description);
    // }
  }, [currentTab, paramsRevision]);

  const copyFull1 = () => {
    // setShortName1(full_name1);
  };

  const copyFull2 = () => {
    setShortName2(full_name2);
  };

  // Hooks for GraphQL queries
  const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
    onCompleted() {},
  });

  const [
    updateItemGlobalMedia,
    // { loading: mutationLoading, error: mutationError }
  ] = useMutation(Update_Item_Global_Media, {
    async onCompleted() {
      // Reset the `mediaAllGenders` placeholder change variable, otherwise
      // the Unsaved Changes card will still remain popped up
      // This is done by setting the previous media to the current one
      if (globalMediaRelease) {
        setPrevMediaAllGenders2(mediaAllGenders2);
      } else {
        setPrevMediaAllGenders1(mediaAllGenders1);
      }
      message.success({ content: Common.Changes_Saved, key }, 2);
      // history.go(0);
    },
    refetchQueries: [
      {
        query: Get_Item_Global_Media_Revision_Changes_Given_Item_Id,
        variables: {
          item_id: Number.parseInt(String(itemId)),
        },
      },
    ],
  });

  const [
    deleteItemTranslationsForRevisionLocalePage,
    {
      loading: loadingDeleteItemTrans,
      error: errorDeleteItemTranslationsForRevisionLocalePage,
    },
  ] = useMutation(Delete_Item_Translation_Revision_Locale_Page, {
    onCompleted() {},
    refetchQueries: [
      {
        query: Get_Item_Translation_Revisions,
        variables: { id: Number.parseInt(String(itemId)) },
      },
    ],
  });

  const [
    deleteItemTranslationsForRevision,
    // { loading: loadingDeleteItemTrans, error: errorDeleteItemTrans }
  ] = useMutation(Delete_Item_Translations_For_Revision, {
    onCompleted() {},
  });

  // const [
  //   deleteItemTranslationRevisionChangesForRevision,
  //   // {
  //   //   loading: loadingDeleteItemTransRevChanges,
  //   //   error: errorDeleteItemTransRevChanges
  //   // }
  // ] = useMutation(Delete_Item_Translation_Revision_Changes_For_Revision, {
  //   onCompleted() {},
  // });

  // const [
  //   deleteItemTranslationRevision,
  //   // { loading: loadingDeleteItemTransRev, error: errorDeleteItemTransRev }
  // ] = useMutation(Delete_Item_Translation_Revision, {
  //   onCompleted() {},
  // });

  interface hasChangedProps {
    mediaAllGenders?: boolean;
    notes?: boolean;
  }

  interface changesProps {
    // Just for client side only, for managing states of titles and heading text
    mediaAllGenders?: string[] | null;
    notes?: string | null;
    media_1_id?: string | null;
    media_2_id?: string | null;
    media_3_id?: string | null;
    media_4_id?: string | null;
    media_5_id?: string | null;
    media_6_id?: string | null;
    media_7_id?: string | null;
    media_8_id?: string | null;
    media_9_id?: string | null;
    media_10_id?: string | null;
  }

  // An object tracking the changes amongst all variables
  // If the frame and its buttons are disabled, then changes are ignored so
  // that there aren't any visual changes (if any changes were to actually
  // occur)
  let hasChanged1: hasChangedProps = {};
  if (globalMediaDraft && state === DataState.Development) {
    console.log('CONSIDER HAS CHANGED');
    console.log(
      'mediaAllGenders1:',
      mediaAllGenders1,
      '| prevMediaItems1:',
      prevMediaAllGenders1
    );
    // Special case for the list of media, because we aren't just comparing
    // ids, but instead objects (which include name and url)
    // This is because of our implementation of list of media, with React
    // Sortable JS
    // Algorithm: Compare order of each array, by combining their ids as a
    // string, and comparing with that value

    hasChanged1 = {
      // full_name: full_name1 !== translationDraft.full_name,
      mediaAllGenders:
        mediaAllGenders1.map(({ id }: any) => id).join() !==
        prevMediaAllGenders1.map(({ id }: any) => id).join(),
    };
  }

  let hasChanged2: hasChangedProps = {};
  if (globalMediaRelease && state === DataState.Review) {
    hasChanged2 = {
      // full_name: full_name2 !== globalMediaRelease.full_name,
      mediaAllGenders:
        mediaAllGenders2.map(({ id }: any) => id).join() !==
        prevMediaAllGenders2.map(({ id }: any) => id).join(),
    };
  }

  // console.log(
  //   "short_name:",
  //   short_name1,
  //   "\ntranslation_short_name:",
  //   translationDraft.short_name
  // );

  // Do not count changes if this frame and its buttons are disabled
  // This is so that the save changes popup on the bottom of the screen
  // won't ever appear (if frame is disabled)
  let numberOfChanges1 = 0;
  // if (translationRelease && translationRelease.revision !== latestRevision) {
  Object.keys(hasChanged1).forEach((key) => {
    // @ts-ignore
    if (hasChanged1[key]) {
      numberOfChanges1++;
    }
  });
  // }

  let numberOfChanges2 = 0;
  Object.keys(hasChanged2).forEach((key) => {
    // @ts-ignore
    if (hasChanged2[key]) {
      numberOfChanges2++;
    }
  });

  console.log('numberOfChanges1:', numberOfChanges1);

  const discardChanges1 = () => {
    // setMediaAllGenders()
    // setDescription1(globalMediaDraft.description);
    setMediaAllGenders1(prevMediaAllGenders1);
  };

  const discardChanges2 = () => {
    setMediaAllGenders2(prevMediaAllGenders2);
  };

  const saveChanges1 = async () => {
    const changes: changesProps = {};

    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: false,
      id: globalMediaDraft.id,
      changes,
    };

    if (numberOfChanges1 > 0) {
      if (hasChanged1.mediaAllGenders) {
        // Special case: Turn array of media items into their respective
        // variables on the database
        if (mediaAllGenders1[0])
          variables.changes.media_1_id = mediaAllGenders1[0].id;
        if (mediaAllGenders1[1])
          variables.changes.media_2_id = mediaAllGenders1[1].id;
        if (mediaAllGenders1[2])
          variables.changes.media_3_id = mediaAllGenders1[2].id;
        if (mediaAllGenders1[3])
          variables.changes.media_4_id = mediaAllGenders1[3].id;
        if (mediaAllGenders1[4])
          variables.changes.media_5_id = mediaAllGenders1[4].id;
        if (mediaAllGenders1[5])
          variables.changes.media_6_id = mediaAllGenders1[5].id;
        if (mediaAllGenders1[6])
          variables.changes.media_7_id = mediaAllGenders1[6].id;
        if (mediaAllGenders1[7])
          variables.changes.media_8_id = mediaAllGenders1[7].id;
        if (mediaAllGenders1[8])
          variables.changes.media_9_id = mediaAllGenders1[8].id;
        if (mediaAllGenders1[9])
          variables.changes.media_10_id = mediaAllGenders1[9].id;
      }

      if (hasChanged1.notes) {
        variables.changes.notes = description1;
      }

      message.loading({ content: Common.Saving_Changes, key });
      await updateItemGlobalMedia({ variables });
    }
  };

  const saveChanges2 = async () => {
    const changes: changesProps = {};

    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: true,
      id: globalMediaRelease.id,
      changes,
    };

    if (numberOfChanges2 > 0) {
      if (hasChanged2.mediaAllGenders) {
        // Special case: Turn array of media items into a single array of ids
        // variables.changes.mediaAllGenders = mediaAllGenders2.map(
        //   ({ id }: any) => id
        // );
      }

      if (hasChanged2.notes) {
        variables.changes.notes = description2;
      }

      message.loading({ content: Common.Saving_Changes, key });
      await updateItemGlobalMedia({ variables });
    }
  };

  const deleteItemTranslationsForThisRevision = async () => {
    const variables = {
      revisionId: currentRevision.id,
    };
    await deleteItemTranslationsForRevision({ variables });
    await updateItemUpdatedAt({
      variables: {
        id: itemId,
      },
    });
    refetchRevisions();
    history.go(0);
  };

  const deleteRevision = async () => {
    message.loading({ content: Common.State_Related.Deleting_Revision, key });
    const variables = {
      id: currentRevision.id,
    };
    console.log('variables:', variables);
    // 1. Delete all changes (i.e. the activity log) for the revision
    // await deleteItemTranslationRevisionChangesForRevision({ variables });
    await deleteItemTranslationsForRevisionLocalePage({ variables });
    // 2. Delete the item translation revision itself
    // await deleteItemTranslationRevision({ variables });
    // 3. Redirect the user either to the previous revision (if any) or
    // to the dashboard if there isn't
    // await updateItemUpdatedAt({
    //   variables: {
    //     id: itemId,
    //   },
    // });

    message.success({
      content: Common.State_Related.Deleted_Revision,
      key,
    });

    if (uniqueRevisions.length > 1) {
      const prevRevision = uniqueRevisions[1];
      navigate(
        `${location.pathname}?rev=${prevRevision.revision}&release=true`
      );
      // history.go(0);
    } else {
      navigate(localisationsUrl);
      // history.go(0);
    }
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes

  // N/A in this component

  const onTabClick = (key: any) => {
    // history.push(`${location.pathname}?id=${paramsRevisionId}&release=${key}`);
    navigate(`${location.pathname}?rev=${paramsRevision}&release=${key}`);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  let releaseTag = <div />;
  if (globalMediaRelease) {
    if (state === DataState.Review) {
      releaseTag = <TagInReview notSelectable />;
    } else if (state === DataState.Production) {
      releaseTag = <TagInProduction notSelectable />;
    } else if (state === DataState.Retired) {
      releaseTag = <TagInRetirement notSelectable />;
    }
    // switch (state) {
    //   case DATA_STATES.REVIEW:
    //     releaseTag = <TagInReview />;
    //     break;
    //   case DATA_STATES.PRODUCTION:
    //     releaseTag = <TagInProduction />;
    //     break;
    //   case DATA_STATES.RETIRED:
    //     releaseTag = <TagInRetirement />;
    //     break;
    // }
  }

  const [selectValue, setSelectValue] = useState(
    // `Revision ${uniqueRevisions[0].revision}`
    // paramsRevisionId
    null
  );
  useEffect(() => {
    // setSelectValue(`Revision ${uniqueRevisions[0].revision}`);
    // setSelectValue(`Revision ${paramsRevisionId}`);
    // setSelectValue(`Revision ${paramsRevision}`);
    // @ts-ignore
    setSelectValue(Number.parseInt(paramsRevision));
  }, [currentTab, paramsRevision]);

  // Handle when the user changes the revision via the drop down box (Select)
  // @ts-ignore
  const handleChangeRevision = ({ value }, option) => {
    // Use the unique revisions to determine the most developed state for
    // each revision (whether it is draft or release)
    // uniqueRevisions
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === value
    );
    console.log('value:', value);
    console.log('matchingRevision:', matchingRevision);
    const { revision, item_translations } = matchingRevision;
    console.log(
      'value:',
      value,
      '\noption:',
      option,
      '\nselectValue:',
      selectValue,
      '\nrevision:',
      revision
    );
    setSelectValue(revision);
    // Set is release to either its actual value (true or false), or if we
    // can't find it, play it safe and assume that it would be false (a
    // revision SHOULD have at least a draft version, i.e. is_release = false)
    // We are selecting the first item (array index 0), typically is the
    // most latest version (i.e. the release version)
    const is_release =
      item_translations.length > 0 ? item_translations[0].is_release : false;
    navigate(`${location.pathname}?rev=${revision}&release=${is_release}`);
  };

  // Whether or not the content frame (it's text fields, buttons, inputs,
  // image selections, etc.) are disabled or not
  let frameIsDisabled = false;
  // Handle cases for release tab
  if (paramsIsReleaseBool) {
    // Disable if the state is not review
    if (state !== DataState.Review) {
      frameIsDisabled = true;
    }
    // Disable if the revision is not the latest (in case of errors)
    else if (
      currentRevision &&
      Number.parseInt(currentRevision.revision) !==
        Number.parseInt(latestRevision)
    ) {
      frameIsDisabled = true;
    }
  }
  // Handle cases for draft tab
  else {
    // Disable if there is a release version
    if (globalMediaRelease !== null) {
      frameIsDisabled = true;
    }
  }

  let selectWidth = 120;
  if (uniqueRevisions.length >= 10) {
    selectWidth = 132;
  }

  const defaultTabStyle: CSSProperties = {
    userSelect: 'none',
  };

  if (errorDeleteItemTranslationsForRevisionLocalePage) {
    const error = `ERROR: ${JSON.stringify(
      errorDeleteItemTranslationsForRevisionLocalePage,
      null,
      2
    )}`;
    console.error(error);
    return <div>${error}</div>;
  }

  const onSortableGridStateChangeAllGenders1 = (newState: any[]) => {
    setMediaAllGenders1(newState);
    console.log('newState:', newState);
    // if (newState !== mediaItems) {
    //   // setMediaItemIds(newState.map(({ id }) => id));
    // }
    // setMediaAllGenderIds1(newState.map(({ id }) => id));
  };

  const onSortableGridStateChangeAllGenders2 = (newState: any[]) => {
    setMediaItems2(newState);
    setMediaAllGenderIds2(newState.map(({ id }) => id));
  };

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={
          globalMediaRelease ? numberOfChanges2 : numberOfChanges1
        }
        discardChanges={globalMediaRelease ? discardChanges2 : discardChanges1}
        saveChanges={globalMediaRelease ? saveChanges2 : saveChanges1}
      />
      <SelectMediaModal
        showModal={showPopup}
        onCancel={closePopup}
        loading={false}
        defaultMediaItemAssociated={defaultMediaItemAssociated}
        mediaAllGenders={
          globalMediaRelease ? mediaAllGenders2 : mediaAllGenders1
        }
        setMediaAllGenders={
          globalMediaRelease ? setMediaAllGenders2 : setMediaAllGenders1
        }
        loadMediaItems={() => {}}
      />
      <Content
        style={{
          padding: 16,
          background: '#fff',
          minWidth: 586,
        }}
      >
        <Row>
          <Col span={16}>
            <FrameTitle
              text={
                <span>
                  <PictureOutlined style={{ marginRight: 6 }} />
                  Global Media
                </span>
              }
            />
          </Col>
          <Col
            style={{
              marginLeft: 'auto',
              left: '-2px',
            }}
          >
            <Select
              style={{ width: selectWidth }}
              // @ts-ignore
              onChange={(value, option) => handleChangeRevision(value, option)}
              labelInValue
              // defaultValue={{ value: Number.parseInt(paramsRevision) }}
              // @ts-ignore
              value={{ value: selectValue }}
              disabled={uniqueRevisions.length === 1}
              className="not-bold"
            >
              {uniqueRevisions.map((uniqueRevision: any) => {
                const { revision, state } = uniqueRevision;
                console.log('uniqueRevision:', uniqueRevision);
                return (
                  <Option value={revision} key={revision}>
                    Revision {revision}{' '}
                    {uniqueRevisions.length > 1 && (
                      <LocaleStateDot state={state} />
                    )}
                  </Option>
                );
              })}
            </Select>
            <BurgerMenuButton
              deleteRevision={deleteItemTranslationsForThisRevision}
            />
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          <Col>
            <TitleAndValue
              title="Revision Id"
              value={revision_id}
              isRevealCode
            />
          </Col>
        </Row>
        {!globalMediaDraft ? (
          <ErrorPleaseFixThis
            message={
              'This Translation Revision does not have a Draft Translation.'
            }
            onClick={deleteRevision}
          />
        ) : (
          <>
            <Tabs
              type="card"
              size="large"
              activeKey={paramsIsRelease}
              onTabClick={onTabClick}
              style={{ marginTop: 12 }}
            >
              <TabPane
                tab={
                  <span>
                    <span
                      style={
                        state === DataState.Development
                          ? { ...defaultTabStyle, marginRight: 8 }
                          : defaultTabStyle
                      }
                    >
                      Draft{numberOfChanges1 > 0 && '*'}
                    </span>
                    {state === DataState.Development && (
                      <TagInDevelopment showShortText notSelectable />
                    )}
                  </span>
                }
                key="false"
              />
              <TabPane
                tab={
                  <span>
                    <span
                      style={
                        state !== DataState.Development
                          ? { ...defaultTabStyle, marginRight: 8 }
                          : defaultTabStyle
                      }
                    >
                      Release{numberOfChanges2 > 0 && '*'}
                    </span>
                    {releaseTag}
                  </span>
                }
                key="true"
                disabled={state === DataState.Development}
              />
            </Tabs>
            <TabContentFrame
              hasChanged={!paramsIsReleaseBool ? hasChanged1 : hasChanged2}
              copyFull={!paramsIsReleaseBool ? copyFull1 : copyFull2}
              disabled={frameIsDisabled}
              // disabled={false}
              description={!paramsIsReleaseBool ? description1 : description2}
              openPopup={openPopup}
              setDescription={
                !paramsIsReleaseBool ? setDescription1 : setDescription2
              }
              mediaAllGenders={
                !paramsIsReleaseBool ? mediaAllGenders1 : mediaAllGenders2
              }
              setMediaAllGenders={
                !paramsIsReleaseBool ? setMediaAllGenders1 : setMediaAllGenders2
              }
              onSortableGridStateChangeAllGenders={
                !paramsIsReleaseBool
                  ? onSortableGridStateChangeAllGenders1
                  : onSortableGridStateChangeAllGenders2
              }
            />
          </>
        )}
      </Content>
    </>
  );
}

export { GlobalMediaFrame };
