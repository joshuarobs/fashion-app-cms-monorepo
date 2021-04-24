import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
  DataChangeType,
  DataAction,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';
import { Col, Layout, message, Row, Tabs, Select } from 'antd';
import { Common } from '../../../../../strings';
import { UnsavedChangesCard } from '../../../../common/UnsavedChangesCard';
import { FrameTitle } from '../../../../common/typography/FrameTitle';
import { TabContentFrame } from '../TabContentFrame';
import { TagInDevelopment } from '../../../../common/localisation/TagInDevelopment';
import { TagInProduction } from '../../../../common/localisation/TagInProduction';
import { TagInReview } from '../../../../common/localisation/TagInReview';
import { TagInRetirement } from '../../../../common/localisation/TagInRetirement';
import { TitleAndValue } from '../../../../common/TitleAndValue';
import { ErrorPleaseFixThis } from '../../../../common/localisation/ErrorPleaseFixThis';
import { LocaleStateDot } from '../../../../common/localisation/LocaleStateDot';
import { BurgerMenuButton } from '../../../../common/frames/BurgerMenuButton/_BurgerMenuButton';
import { getSomePartsOfUrl } from '../../../../../utils/getSomePartsOfUrl';
import { Insert_Item_Translation_Revision_Change } from '../../../../../queries/item_translation_revision_changes/insertItemTranslationRevisionChange';
import { Delete_Item_Translations_For_Revision } from '../../../../../queries/item_translations/deleteItemTranslationForRevision';
import { Delete_Item_Translation_Revision_Changes_For_Revision } from '../../../../../queries/item_translation_revision_changes/deleteItemTranslationRevisionChangeForRevision';
import { Delete_Item_Translation_Revision } from '../../../../../queries/item_translation_revisions/deleteItemTranslationRevision';
import { Update_Item_Updated_At } from '../../../../../queries/items/updateItemUpdatedAt';
import { Update_Item_Translation } from '../../../../../queries/item_translations/updateItemTranslation';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

// const size = "small";

const key = 'unsaved-changes-localisations';

interface LocalisationFrameProps {
  currentTab: any;
  translationDraft: any;
  translationRelease: any;
  itemId: number;
  location: any;
  translationRevision: any;
  paramsRevision: any;
  paramsIsRelease: string;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchTranslations: Function;
}

function LocalisationFrame({
  currentTab,
  // currentRevision,
  translationDraft,
  translationRelease,
  itemId,
  location,
  translationRevision,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  refetchRevisions,
  refetchTranslations,
}: LocalisationFrameProps) {
  // console.log("Current tab:", currentTab);
  // console.log("location:", location);
  // console.log("translationRevision:", translationRevision);
  // console.log("TRANSLATION DRAFT:", translationDraft);
  // console.log("TRANSLATION RELEASE:", translationRelease);
  const history = useHistory();
  const localisationsUrl = getSomePartsOfUrl(location.pathname, 6);

  console.log('paramsRevision:', paramsRevision);

  const country = translationRevision.locale.country.description;
  const language = translationRevision.locale.language.description;
  const locale_code = translationRevision.locale.code;
  // const revision_id = translationRevision.id;

  const [currentRevision, setCurrentRevision] = useState(uniqueRevisions[0]);
  const [state, setState] = useState(null);
  const [revision_id, setRevisionId] = useState(null);

  useEffect(() => {
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === Number.parseInt(paramsRevision)
    );
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
  }, [currentTab, paramsRevision]);

  // useEffect(() => {
  //   setState(currentRevision ? currentRevision.state : null);
  // }, [paramsRevision]);

  // const state = currentRevision ? currentRevision.state : null;
  console.log('currentRevision:', currentRevision);

  // console.log("State:", state);

  // console.log("uniqueRevisions:", uniqueRevisions);
  // The latest revision number
  const latestRevision = uniqueRevisions[0].revision;

  const [tabTitle, setTabTitle] = useState(null);
  useEffect(() => {
    setTabTitle(translationRevision.locale.name);
  }, [currentTab]);

  // `paramsIsRelease` in boolean form, since the parameter in the url is in
  // string form
  const paramsIsReleaseBool = paramsIsRelease === 'true';

  // STATES FOR THE DRAFT TRANSLATIONS
  const [full_name1, setFullName1] = useState();
  useEffect(() => {
    setFullName1(translationDraft ? translationDraft.full_name : null);
  }, [currentTab, paramsRevision]);

  const [short_name1, setShortName1] = useState();
  useEffect(() => {
    setShortName1(translationDraft ? translationDraft.short_name : null);
  }, [currentTab, paramsRevision]);

  const [description1, setDescription1] = useState();
  useEffect(() => {
    setDescription1(translationDraft ? translationDraft.description : null);
  }, [currentTab, paramsRevision]);

  // STATES FOR THE RELEASE TRANSLATIONS
  const [full_name2, setFullName2] = useState();
  useEffect(() => {
    if (translationRelease) {
      setFullName2(translationRelease.full_name);
    } else if (translationDraft) {
      setFullName2(translationDraft.full_name);
    }
  }, [currentTab, paramsRevision]);

  const [short_name2, setShortName2] = useState();
  useEffect(() => {
    // setShortName2(translationRelease ? translationRelease.short_name : null);
    if (translationRelease) {
      setShortName2(translationRelease.short_name);
    } else if (translationDraft) {
      setShortName2(translationDraft.short_name);
    }
  }, [currentTab, paramsRevision]);

  const [description2, setDescription2] = useState();
  useEffect(() => {
    // setDescription2(translationRelease ? translationRelease.description : null);
    if (translationRelease) {
      setDescription2(translationRelease.description);
    } else if (translationDraft) {
      setDescription2(translationDraft.description);
    }
  }, [currentTab, paramsRevision]);

  const copyFull1 = () => {
    setShortName1(full_name1);
  };

  const copyFull2 = () => {
    setShortName2(full_name2);
  };

  // Hooks for GraphQL queries
  const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
    onCompleted() {},
  });

  const [
    insertItemTranslationRevisionChange,
    // { loading: mutationLoadingChanges, error: mutationErrorChanges }
  ] = useMutation(Insert_Item_Translation_Revision_Change, {
    onCompleted() {},
  });

  const [
    updateItemTranslation,
    // { loading: mutationLoading, error: mutationError }
  ] = useMutation(Update_Item_Translation, {
    async onCompleted() {
      // refetch();
      // setOriginalClothingShellId(clothing_shell_id);
      const variables = {
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Action,
        action: DataAction.Update,
      };
      await insertItemTranslationRevisionChange({
        variables,
      });
      await updateItemUpdatedAt({
        variables: {
          id: itemId,
        },
      });
      message.success({ content: Common.Changes_Saved, key }, 2);
      history.go(0);
    },
  });

  const [
    deleteItemTranslationsForRevision,
    // { loading: loadingDeleteItemTrans, error: errorDeleteItemTrans }
  ] = useMutation(Delete_Item_Translations_For_Revision, {
    onCompleted() {},
  });

  const [
    deleteItemTranslationRevisionChangesForRevision,
    // {
    //   loading: loadingDeleteItemTransRevChanges,
    //   error: errorDeleteItemTransRevChanges
    // }
  ] = useMutation(Delete_Item_Translation_Revision_Changes_For_Revision, {
    onCompleted() {},
  });

  const [
    deleteItemTranslationRevision,
    // { loading: loadingDeleteItemTransRev, error: errorDeleteItemTransRev }
  ] = useMutation(Delete_Item_Translation_Revision, {
    onCompleted() {},
  });

  interface changesProps {
    full_name?: boolean | null;
    short_name?: boolean | null;
    description?: boolean | null;
  }

  // An object tracking the changes amongst all variables
  // If the frame and its buttons are disabled, then changes are ignored so
  // that there aren't any visual changes (if any changes were to actually
  // occur)
  let hasChanged1: changesProps = {};
  if (translationDraft && state === DataState.Development) {
    hasChanged1 = {
      full_name: full_name1 !== translationDraft.full_name,
      short_name: short_name1 !== translationDraft.short_name,
      description: description1 !== translationDraft.description,
    };
  }

  let hasChanged2: changesProps = {};
  if (translationRelease && state === DataState.Review) {
    hasChanged2 = {
      full_name: full_name2 !== translationRelease.full_name,
      short_name: short_name2 !== translationRelease.short_name,
      description: description2 !== translationRelease.description,
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

  const discardChanges1 = () => {
    setFullName1(translationDraft.full_name);
    setShortName1(translationDraft.short_name);
    setDescription1(translationDraft.description);
  };

  const discardChanges2 = () => {
    setFullName2(translationRelease.full_name);
    setShortName2(translationRelease.short_name);
    setDescription2(translationRelease.description);
  };

  const saveChanges1 = async () => {
    const changes: changesProps = {};

    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: false,
      id: translationDraft.id,
      changes,
    };

    if (numberOfChanges1 > 0) {
      if (hasChanged1.full_name) {
        variables.changes.full_name = full_name1;
      }

      if (hasChanged1.short_name) {
        variables.changes.short_name = short_name1;
      }

      if (hasChanged1.description) {
        variables.changes.description = description1;
      }

      message.loading({ content: Common.Saving_Changes, key });
      await updateItemTranslation({ variables });
    }
  };

  const saveChanges2 = async () => {
    const changes: changesProps = {};

    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: true,
      id: translationRelease.id,
      changes,
    };

    if (numberOfChanges2 > 0) {
      if (hasChanged2.full_name) {
        variables.changes.full_name = full_name2;
      }

      if (hasChanged2.short_name) {
        variables.changes.short_name = short_name2;
      }

      if (hasChanged2.description) {
        variables.changes.description = description2;
      }

      message.loading({ content: Common.Saving_Changes, key });
      await updateItemTranslation({ variables });
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
    // 1. Delete all changes (i.e. the activity log) for the revision
    await deleteItemTranslationRevisionChangesForRevision({ variables });
    // 2. Delete the item translation revision itself
    await deleteItemTranslationRevision({ variables });
    // 3. Redirect the user either to the previous revision (if any) or
    // to the dashboard if there isn't
    await updateItemUpdatedAt({
      variables: {
        id: itemId,
      },
    });
    message.success({
      content: Common.State_Related.Deleted_Revision,
      key,
    });
    if (uniqueRevisions.length > 1) {
      const prevRevision = uniqueRevisions[1];
      history.push(
        `${location.pathname}?rev=${prevRevision.revision}&release=true`
      );
      history.go(0);
    } else {
      history.push(localisationsUrl);
      history.go(0);
    }
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes
  const onPressEnterFullName1 = () => {
    if (numberOfChanges1 === 1 && hasChanged1.full_name) {
      saveChanges1().then();
    }
  };

  const onPressEnterShortName1 = () => {
    if (numberOfChanges1 === 1 && hasChanged1.short_name) {
      saveChanges1().then();
    }
  };

  const onPressEnterFullName2 = () => {
    if (numberOfChanges2 === 1 && hasChanged2.full_name) {
      saveChanges2().then();
    }
  };

  const onPressEnterShortName2 = () => {
    if (numberOfChanges2 === 1 && hasChanged2.short_name) {
      saveChanges2().then();
    }
  };

  const onTabClick = (key: any) => {
    // history.push(`${location.pathname}?id=${paramsRevisionId}&release=${key}`);
    history.push(`${location.pathname}?rev=${paramsRevision}&release=${key}`);
  };

  let releaseTag = <div />;
  if (translationRelease) {
    if (state === DataState.Review) {
      releaseTag = <TagInReview />;
    } else if (state === DataState.Production) {
      releaseTag = <TagInProduction />;
    } else if (state === DataState.Retired) {
      releaseTag = <TagInRetirement />;
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
    history.push(`${location.pathname}?rev=${revision}&release=${is_release}`);
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
    if (translationRelease !== null) {
      frameIsDisabled = true;
    }
  }

  let selectWidth = 120;
  if (uniqueRevisions.length >= 10) {
    selectWidth = 132;
  }

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={
          translationRelease ? numberOfChanges2 : numberOfChanges1
        }
        discardChanges={translationRelease ? discardChanges2 : discardChanges1}
        saveChanges={translationRelease ? saveChanges2 : saveChanges1}
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
            <FrameTitle text={tabTitle} />
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
        <Row>
          <Col span={8}>
            <TitleAndValue
              title="Country"
              value={country.substring(4, country.length)}
            />
          </Col>
          <Col span={8}>
            <TitleAndValue
              title="Language"
              value={language.substring(4, language.length)}
            />
          </Col>
          <Col span={8}>
            <TitleAndValue title="Locale Code" value={locale_code} isCode />
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
        {!translationDraft ? (
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
                          ? { marginRight: 8 }
                          : {}
                      }
                    >
                      Draft{numberOfChanges1 > 0 && '*'}
                    </span>
                    {state === DataState.Development && (
                      <TagInDevelopment showShortText />
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
                          ? { marginRight: 8 }
                          : {}
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
              full_name={!paramsIsReleaseBool ? full_name1 : full_name2}
              setFullName={!paramsIsReleaseBool ? setFullName1 : setFullName2}
              short_name={!paramsIsReleaseBool ? short_name1 : short_name2}
              setShortName={
                !paramsIsReleaseBool ? setShortName1 : setShortName2
              }
              description={!paramsIsReleaseBool ? description1 : description2}
              setDescription={
                !paramsIsReleaseBool ? setDescription1 : setDescription2
              }
              onPressEnterFullName={
                !paramsIsReleaseBool
                  ? onPressEnterFullName1
                  : onPressEnterFullName2
              }
              onPressEnterShortName={
                !paramsIsReleaseBool
                  ? onPressEnterShortName1
                  : onPressEnterShortName2
              }
            />
          </>
        )}
      </Content>
    </>
  );
}

export { LocalisationFrame };
