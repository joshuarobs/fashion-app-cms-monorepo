import React, { CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DataState } from '@joshuarobs/clothing-framework';
import { Col, Layout, message, Row, Tabs, Select, Button } from 'antd';
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
import { Delete_Item_Translations_For_Revision } from '../../../../queries/item_translations/deleteItemTranslationForRevision';
import { Update_Item_Updated_At } from '../../../../queries/items/updateItemUpdatedAt';
import { Delete_Item_Translation_Revision_Locale_Page } from '../../../../queries/item_translation_revisions/deleteItemTranslationRevisionLocalePage';
import { Get_Item_Translation_Revisions } from '../../../../queries/item_translation_revisions/getItemTranslationRevisions';
import { PictureOutlined } from '@ant-design/icons';
import { SelectMediaModal } from './SelectMediaModal/_SelectMediaModal';
import { Update_Item_Global_Media } from '../../../../queries/item_global_media/updateItemGlobalMedia';
import { Get_Item_Global_Media_Revision_Changes_Given_Item_Id } from '../../../../queries/item_global_media_revision_changes/getItemGlobalMediaRevisionChangesGivenItemId';
import { useGlobalMediaTabContext } from './_GlobalMediaTab';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

const key = 'unsaved-changes-localisations';

interface GlobalMediaFrameProps {
  currentTab: any;
  revisionIdDraft: string | null;
  revisionIdRelease: string | null;
  globalMediaDraft: any;
  globalMediaRelease: any;
  defaultMediaItemAssociated: [];
  itemId?: string;
  location: any;
  translationRevision: any;
  refetchMediaItemsByIds: Function;
  paramsRevision: any;
  paramsIsRelease: string;
  uniqueRevisions: any;
  refetchRevisions: Function;
  // refetchTranslations: Function;
}

function GlobalMediaFrame({
  currentTab,
  // currentRevision,
  revisionIdDraft,
  revisionIdRelease,
  globalMediaDraft,
  globalMediaRelease,
  defaultMediaItemAssociated,
  itemId,
  location,
  translationRevision,
  refetchMediaItemsByIds,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  refetchRevisions,
}: // refetchTranslations,
GlobalMediaFrameProps) {
  // console.log("Current tab:", currentTab);
  // console.log("location:", location);
  const navigate = useNavigate();
  const localisationsUrl = getSomePartsOfUrl(location.pathname, 6);

  console.log('paramsRevision:', paramsRevision);

  const {
    mediaAllGenders,
    setMediaAllGenders,
    prevMediaAllGenders,
    setPrevMediaAllGenders,
    discardChanges,
    notes,
    prevNotes,
    setPrevNotes,
  } = useGlobalMediaTabContext();

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

  // Hooks for GraphQL queries
  const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
    onCompleted() {},
  });

  const [
    updateItemGlobalMedia,
    // { loading: mutationLoading, error: mutationError }
  ] = useMutation(Update_Item_Global_Media, {
    async onCompleted() {
      setPrevMediaAllGenders(mediaAllGenders);
      setPrevNotes(notes);
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
  if (mediaAllGenders && state === DataState.Development) {
    console.log('CONSIDER HAS CHANGED');
    // Special case for the list of media, because we aren't just comparing
    // ids, but instead objects (which include name and url)
    // This is because of our implementation of list of media, with React
    // Sortable JS
    // Algorithm: Compare order of each array, by combining their ids as a
    // string, and comparing with that value

    hasChanged1 = {
      mediaAllGenders:
        mediaAllGenders.map(({ id }: any) => id).join() !==
        prevMediaAllGenders.map(({ id }: any) => id).join(),
      notes: notes !== prevNotes,
    };
  }

  let hasChanged2: hasChangedProps = {};
  if (mediaAllGenders && state === DataState.Review) {
    hasChanged2 = {
      mediaAllGenders:
        mediaAllGenders.map(({ id }: any) => id).join() !==
        prevMediaAllGenders.map(({ id }: any) => id).join(),
      notes: notes !== prevNotes,
    };
  }

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

  const saveChanges1 = async () => {
    const changes: changesProps = {};
    // console.log('mediaAllGenders:', mediaAllGenders);

    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: false,
      // id: globalMediaDraft.id,
      id: revisionIdDraft,
      changes,
    };

    if (numberOfChanges1 > 0) {
      if (hasChanged1.mediaAllGenders) {
        // console.log('mediaAllGenders1:', mediaAllGenders1);
        // Special case: Turn array of media items into their respective
        // variables on the database
        if (mediaAllGenders[0]) {
          variables.changes.media_1_id = mediaAllGenders[0].id;
        } else {
          variables.changes.media_1_id = null;
        }
        if (mediaAllGenders[1]) {
          variables.changes.media_2_id = mediaAllGenders[1].id;
        } else {
          variables.changes.media_2_id = null;
        }
        if (mediaAllGenders[2]) {
          variables.changes.media_3_id = mediaAllGenders[2].id;
        } else {
          variables.changes.media_3_id = null;
        }
        if (mediaAllGenders[3]) {
          variables.changes.media_4_id = mediaAllGenders[3].id;
        } else {
          variables.changes.media_4_id = null;
        }
        if (mediaAllGenders[4]) {
          variables.changes.media_5_id = mediaAllGenders[4].id;
        } else {
          variables.changes.media_5_id = null;
        }
        if (mediaAllGenders[5]) {
          variables.changes.media_6_id = mediaAllGenders[5].id;
        } else {
          variables.changes.media_6_id = null;
        }
        if (mediaAllGenders[6]) {
          variables.changes.media_7_id = mediaAllGenders[6].id;
        } else {
          variables.changes.media_7_id = null;
        }
        if (mediaAllGenders[7]) {
          variables.changes.media_8_id = mediaAllGenders[7].id;
        } else {
          variables.changes.media_8_id = null;
        }
        if (mediaAllGenders[8]) {
          variables.changes.media_9_id = mediaAllGenders[8].id;
        } else {
          variables.changes.media_9_id = null;
        }
        if (mediaAllGenders[9]) {
          variables.changes.media_10_id = mediaAllGenders[9].id;
        } else {
          variables.changes.media_10_id = null;
        }
      }

      if (hasChanged1.notes) {
        variables.changes.notes = notes;
      }

      console.log('variables:', variables);

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
        variables.changes.notes = notes;
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

  //------------------------------------------------------------
  // State change handling for adding/deselecting via the popup
  //------------------------------------------------------------
  const loadMediaItems1 = async (ids: string[]) => {
    await refetchMediaItemsByIds(ids, false, false);
  };

  const loadMediaItems2 = async (ids: string[]) => {
    await refetchMediaItemsByIds(ids, true, false);
  };

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={
          paramsIsReleaseBool ? numberOfChanges2 : numberOfChanges1
        }
        // discardChanges={paramsIsReleaseBool ? discardChanges2 : discardChanges1}
        discardChanges={discardChanges}
        saveChanges={paramsIsReleaseBool ? saveChanges2 : saveChanges1}
      />
      <SelectMediaModal
        showModal={showPopup}
        onCancel={closePopup}
        loading={false}
        defaultMediaItemAssociated={defaultMediaItemAssociated}
        mediaAllGenders={mediaAllGenders}
        // setMediaAllGenders={
        //   paramsIsReleaseBool ? setMediaAllGenders2 : setMediaAllGenders1
        // }
        loadMediaItems={paramsIsReleaseBool ? loadMediaItems2 : loadMediaItems1}
        // loadMediaItems={() => {}}
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
              disabled={frameIsDisabled}
              // disabled={false}
              // description={''}
              openPopup={openPopup}
              // setDescription={() => {}}
            />
          </>
        )}
      </Content>
    </>
  );
}

export { GlobalMediaFrame };
