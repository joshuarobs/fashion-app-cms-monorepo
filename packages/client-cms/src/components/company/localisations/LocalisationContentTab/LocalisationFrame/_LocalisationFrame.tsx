import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { DataState } from '@joshuarobs/clothing-framework/build/enums';
import {
  Col,
  Input,
  Layout,
  message,
  Row,
  Tabs,
  Typography,
  Select,
} from 'antd';
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
import { BurgerMenuButton } from '../../../../common/frames/BurgerMenuButton/_BurgerMenuButton';
import { getSomePartsOfUrl } from '../../../../../utils/getSomePartsOfUrl';
import { RevisionDropdownBox } from '../../../../common/page-state-related/RevisionDropdownBox';
import { Insert_Company_Translation_Revision_Change_Action_Update } from '../../../../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChangeActUpdate';
import { Delete_Company_Translation_Revision } from '../../../../../queries/company_translation_revisions/deleteCompanyTranslationRevision';
import { Delete_Company_Translations_For_Revision } from '../../../../../queries/company_translations/deleteCompanyTranslationsForRevision';
import { Delete_Company_Translation_Revision_Changes_For_Revision } from '../../../../../queries/company_translation_revision_changes/deleteCompanyTranslationRevisionChangesForRevision';
import { Update_Company_Translation } from '../../../../../queries/company_translations/updateCompanyTranslation';

const { Content } = Layout;
const { TabPane } = Tabs;

const key = 'unsaved-changes-localisations';

interface LocalisationFrameProps {
  currentTab: string;
  // currentRevision,
  translationDraft: any;
  translationRelease: any;
  location: any;
  translationRevision: any;
  paramsRevision: string;
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
  location,
  translationRevision,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  refetchRevisions,
}: // refetchTranslations,
LocalisationFrameProps) {
  // console.log("Current tab:", currentTab);
  // console.log("location:", location);
  // console.log("translationRevision:", translationRevision);
  // console.log("TRANSLATION DRAFT:", translationDraft);
  // console.log("TRANSLATION RELEASE:", translationRelease);
  const Url_Number_Of_Parts = 5;
  const navigate = useNavigate();
  const localisationsUrl = getSomePartsOfUrl(
    location.pathname,
    Url_Number_Of_Parts
  );

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
    if (matchingRevision) {
      setCurrentRevision(matchingRevision);
      // setState(currentRevision ? currentRevision.state : null);
      setState(matchingRevision ? matchingRevision.state : null);
      setRevisionId(matchingRevision ? matchingRevision.id : null);
      // console.log(
      //   "SET CURRENT REVISION:",
      //   currentRevision,
      //   "\nParams:",
      //   paramsRevision,
      //   "\nMatching revision:",
      //   matchingRevision,
      //   "\nUnique revs:",
      //   uniqueRevisions
      // );
    }
  }, [currentTab, paramsRevision, uniqueRevisions]);

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
  const [stylised_name1, setStylisedName1] = useState();
  useEffect(() => {
    setStylisedName1(
      translationDraft ? translationDraft.stylised_name : undefined
    );
  }, [currentTab, paramsRevision]);

  const [short_name1, setShortName1] = useState();
  useEffect(() => {
    setShortName1(translationDraft ? translationDraft.short_name : undefined);
  }, [currentTab, paramsRevision]);

  const [bio1, setBio1] = useState();
  useEffect(() => {
    setBio1(translationDraft ? translationDraft.bio : undefined);
  }, [currentTab, paramsRevision]);

  // STATES FOR THE RELEASE TRANSLATIONS
  const [stylised_name2, setStylisedName2] = useState();
  useEffect(() => {
    if (translationRelease) {
      setStylisedName2(translationRelease.stylised_name);
    } else if (translationDraft) {
      setStylisedName2(translationDraft.stylised_name);
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

  const [bio2, setBio2] = useState();
  useEffect(() => {
    // setDescription2(translationRelease ? translationRelease.description : null);
    if (translationRelease) {
      setBio2(translationRelease.bio);
    } else if (translationDraft) {
      setBio2(translationDraft.bio);
    }
  }, [currentTab, paramsRevision]);

  const copyStylised1 = () => {
    setShortName1(stylised_name1);
  };

  const copyStylised2 = () => {
    setShortName2(stylised_name2);
  };

  // Hooks for GraphQL queries
  const [
    insertCompanyTranslationRevisionChangeActUpdate,
    { loading: mutationLoadingChanges, error: mutationErrorChanges },
  ] = useMutation(Insert_Company_Translation_Revision_Change_Action_Update, {
    onCompleted() {},
  });

  const [
    updateCompanyTranslation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(Update_Company_Translation, {
    onCompleted() {
      // refetch();
      // setOriginalClothingShellId(clothing_shell_id);
      message.success({ content: Common.Changes_Saved, key }).then();
      const variables = {
        revisionId: currentRevision.id,
        userId: 1,
      };
      insertCompanyTranslationRevisionChangeActUpdate({
        variables,
      }).then(() => {
        navigate(0);
        // history.go(0);
      });
    },
  });

  const [
    deleteCompanyTranslationsForRevision,
    { loading: loadingDeleteItemTrans, error: errorDeleteItemTrans },
  ] = useMutation(Delete_Company_Translations_For_Revision, {
    onCompleted() {
      refetchRevisions();
      navigate(0);
      // history.go(0);
    },
  });

  const [
    deleteCompanyTranslationRevisionChangesForRevision,
    {
      loading: loadingDeleteItemTransRevChanges,
      error: errorDeleteItemTransRevChanges,
    },
  ] = useMutation(Delete_Company_Translation_Revision_Changes_For_Revision, {
    onCompleted() {},
  });

  const [
    deleteCompanyTranslationRevision,
    { loading: loadingDeleteItemTransRev, error: errorDeleteItemTransRev },
  ] = useMutation(Delete_Company_Translation_Revision, {
    onCompleted() {},
  });

  // An object tracking the changes amongst all variables
  // If the frame and its buttons are disabled, then changes are ignored so
  // that there aren't any visual changes (if any changes were to actually
  // occur)
  let hasChanged1 = {};
  if (translationDraft && state === DataState.Development) {
    hasChanged1 = {
      stylised_name: stylised_name1 !== translationDraft.stylised_name,
      short_name: short_name1 !== translationDraft.short_name,
      bio: bio1 !== translationDraft.bio,
    };
  }

  let hasChanged2 = {};
  if (translationRelease && state === DataState.Review) {
    hasChanged2 = {
      stylised_name: stylised_name2 !== translationRelease.stylised_name,
      short_name: short_name2 !== translationRelease.short_name,
      bio: bio2 !== translationRelease.bio,
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
    setStylisedName1(translationDraft.stylised_name);
    setShortName1(translationDraft.short_name);
    setBio1(translationDraft.bio);
  };

  const discardChanges2 = () => {
    setStylisedName2(translationRelease.stylised_name);
    setShortName2(translationRelease.short_name);
    setBio2(translationRelease.bio);
  };

  interface changesProps {
    stylised_name?: string | null;
    short_name?: string | null;
    bio?: string | null;
  }

  const changes: changesProps = {};

  const saveChanges1 = () => {
    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: false,
      id: translationDraft.id,
      changes,
    };

    if (numberOfChanges1 > 0) {
      // @ts-ignore
      if (hasChanged1.stylised_name) {
        variables.changes.stylised_name = stylised_name1;
      }

      // @ts-ignore
      if (hasChanged1.short_name) {
        variables.changes.short_name = short_name1;
      }

      // @ts-ignore
      if (hasChanged1.bio) {
        variables.changes.bio = bio1;
      }

      message.loading({ content: Common.Saving_Changes, key }).then();
      updateCompanyTranslation({ variables }).then();
    }
  };

  const changes2: changesProps = {};

  const saveChanges2 = () => {
    // Variables required for the GraphQL query
    const variables = {
      // revisionId: translationDraft.revision_id,
      // isRelease: true,
      id: translationRelease.id,
      changes: changes2,
    };

    if (numberOfChanges2 > 0) {
      // @ts-ignore
      if (hasChanged2.stylised_name) {
        variables.changes.stylised_name = stylised_name2;
      }
      // @ts-ignore
      if (hasChanged2.short_name) {
        variables.changes.short_name = short_name2;
      }
      // @ts-ignore
      if (hasChanged2.bio) {
        variables.changes.bio = bio2;
      }

      message.loading({ content: Common.Saving_Changes, key }).then();
      updateCompanyTranslation({ variables }).then();
    }
  };

  const deleteItemTranslationsForThisRevision = () => {
    const variables = {
      revisionId: currentRevision.id,
    };
    deleteCompanyTranslationsForRevision({ variables }).then();
  };

  const deleteRevision = () => {
    message
      .loading({ content: Common.State_Related.Deleting_Revision, key })
      .then();
    const variables = {
      id: currentRevision.id,
    };
    // 1. Delete all changes (i.e. the activity log) for the revision
    deleteCompanyTranslationRevisionChangesForRevision({ variables }).then(
      () => {
        // 2. Delete the item translation revision itself
        deleteCompanyTranslationRevision({ variables }).then(() => {
          // 3. Redirect the user either to the previous revision (if any) or
          // to the dashboard if there isn't
          message
            .success({
              content: Common.State_Related.Deleted_Revision,
              key,
            })
            .then();
          if (uniqueRevisions.length > 1) {
            const prevRevision = uniqueRevisions[1];
            navigate(
              `${location.pathname}?rev=${prevRevision.revision}&release=true`
            );
          } else {
            navigate(localisationsUrl);
          }
        });
      }
    );
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes
  const onPressEnterStylisedName1 = () => {
    // @ts-ignore
    if (numberOfChanges1 === 1 && hasChanged1.stylised_name) {
      saveChanges1();
    }
  };

  const onPressEnterShortName1 = () => {
    // @ts-ignore
    if (numberOfChanges1 === 1 && hasChanged1.short_name) {
      saveChanges1();
    }
  };

  const onPressEnterStylisedName2 = () => {
    // @ts-ignore
    if (numberOfChanges2 === 1 && hasChanged2.stylised_name) {
      saveChanges2();
    }
  };

  const onPressEnterShortName2 = () => {
    // @ts-ignore
    if (numberOfChanges2 === 1 && hasChanged2.short_name) {
      saveChanges2();
    }
  };

  const onTabClick = (key: any) => {
    // history.push(`${location.pathname}?id=${paramsRevisionId}&release=${key}`);
    navigate(`${location.pathname}?rev=${paramsRevision}&release=${key}`);
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
    const { revision, company_translations } = matchingRevision;
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
      company_translations.length > 0
        ? company_translations[0].is_release
        : false;
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
            <RevisionDropdownBox
              uniqueRevisions={uniqueRevisions}
              selectValue={selectValue}
              handleChangeRevision={handleChangeRevision}
            />
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
              copyStylised={
                !paramsIsReleaseBool ? copyStylised1 : copyStylised2
              }
              disabled={frameIsDisabled}
              // disabled={false}
              stylised_name={
                !paramsIsReleaseBool ? stylised_name1 : stylised_name2
              }
              setStylisedName={
                !paramsIsReleaseBool ? setStylisedName1 : setStylisedName2
              }
              short_name={!paramsIsReleaseBool ? short_name1 : short_name2}
              setShortName={
                !paramsIsReleaseBool ? setShortName1 : setShortName2
              }
              bio={!paramsIsReleaseBool ? bio1 : bio2}
              setBio={!paramsIsReleaseBool ? setBio1 : setBio2}
              onPressEnterStylisedName={
                !paramsIsReleaseBool
                  ? onPressEnterStylisedName1
                  : onPressEnterStylisedName2
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
