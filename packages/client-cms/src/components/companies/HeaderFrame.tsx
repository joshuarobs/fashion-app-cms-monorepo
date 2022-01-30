/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React, { useEffect, useRef, useState } from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeader, Tabs, Button, message } from 'antd';
import { HeaderTabLinkCountBadge } from '../common/HeaderTabLinkCountBadge';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../routeStrings';
import { App_Shell, Common } from '../../strings';
import { NewEntryModal } from './NewEntryModal';
import { CompaniesPageIcon } from '../common/icons/page-icons/CompaniesPageIcon';
import { Insert_Company } from '../../queries/companies/insertCompany';
import { Insert_Company_Count } from '../../queries/company_counts/insertCompanyCount';

const { TabPane } = Tabs;

const key = 'companies-header-frame';

function HeaderFrame() {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [newIsReseller, setNewIsReseller] = useState(false);

  const navigate = useNavigate();
  // Hooks for GraphQL queries
  const [
    insertCompanyCount,
    { loading: loadingInsertCompanyCount, error: errorInsertCompanyCount },
  ] = useMutation(Insert_Company_Count, {
    onCompleted({}) {},
  });

  const [insertCompany, { loading: mutationLoading, error: mutationError }] =
    useMutation(Insert_Company, {
      async onCompleted({ insert_companies_one }) {
        console.log('insert_companies_one:', insert_companies_one);
        // setOriginalClothingShellId(clothing_shell_id);
        await insertCompanyCount({
          variables: {
            companyId: insert_companies_one.id,
          },
        });
        navigate(
          `${RouteStrings.Companies__Company}/${insert_companies_one.id}`
        );
        message.success({ content: Common.Created_New_Company, key });
      },
    });

  // const [
  //   updateCompanyItemCount,
  //   { loading: loadingUpdCompanyItemCount, error: errorUpdCompanyItemCount }
  // ] = useMutation(UPDATE_COMPANY, {
  //   onCompleted() {}
  // });
  //
  // const [
  //   getProductionItemCountForCompany,
  //   { loading: loadingGetItemCount, error: errorGetItemCount }
  // ] = useLazyQuery(GET_UNIQUE_ITEM_MAINDATA_REV_AMOUNT_FOR_BRAND_PROD_ONLY, {
  //   async onCompleted({ item_maindata_revisions_aggregate }) {
  //     console.log(
  //       "item_maindata_revisions_aggregate:",
  //       item_maindata_revisions_aggregate
  //     );
  //     // await updateCompanyItemCount({
  //     //   variables: {
  //     //     // id: company.id,
  //     //     changes: {
  //     //       item_count: item_maindata_revisions_aggregate.aggregate.count
  //     //     }
  //     //   }
  //     // });
  //     // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
  //   }
  // });
  //
  // const [
  //   updateAllCompanyItemCounts,
  //   { loading: loadingGetLazyCompanies, error: errorGetLazyCompanies }
  // ] = useLazyQuery(GET_COMPANIES_LIST_BB, {
  //   async onCompleted({ companies }) {
  //     // console.log("companies:", companies);
  //     await companies.forEach(company => {
  //       console.log("company:", company);
  //       getProductionItemCountForCompany({
  //         variables: {
  //           id: company.id
  //         }
  //       });
  //     });
  //   }
  // });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [showModal]);

  const onClickUpdateItemCounts = async () => {
    console.log('COMPANIES HEADER > onClickUpdateItemCounts');
    // Get all companies
    // updateAllCompanyItemCounts({
    //   variables: {}
    // });
    // For each company...
    // getProductionItemCountForCompany
  };

  const onClickAddNew = () => {
    setShowModal(true);
  };

  const onSubmit = () => {
    // message.loading({ content: COMMON.CREATING_NEW_CLOTHING_SHELL, key });
    // If only 1 is set, and not the other (enter key for quick save only
    // works iff 1 field is set, consistent with other pages)
    if (newName) {
      insertCompany({
        variables: {
          name: newName,
          websiteUrl: newWebsiteUrl,
          isReseller: newIsReseller,
        },
      });
    }
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <NewEntryModal
        showModal={showModal}
        onCancel={onCancel}
        onSubmit={onSubmit}
        inputRef={inputRef}
        name={newName}
        setName={setNewName}
        websiteUrl={newWebsiteUrl}
        setWebsiteUrl={setNewWebsiteUrl}
        isReseller={newIsReseller}
        setIsReseller={setNewIsReseller}
        loading={mutationLoading}
      />
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#fff',
        }}
        title={
          <div>
            <CompaniesPageIcon />
            <span>{App_Shell.Sidebar.Pages.Companies}</span>
          </div>
        }
        extra={[
          <Button
            key="2"
            size="small"
            icon={<SyncOutlined />}
            onClick={onClickUpdateItemCounts}
          >
            Update Item Counts
          </Button>,
          <Button
            key="1"
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={onClickAddNew}
          >
            Add New
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span className="page-tab-link">
                  {/*<GlobalOutlined />*/}
                  Active
                  <HeaderTabLinkCountBadge count={100} />
                </span>
              }
              key="1"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Development
                  <HeaderTabLinkCountBadge count={5} />
                </span>
              }
              key="2"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Review
                  <HeaderTabLinkCountBadge count={2} />
                </span>
              }
              key="3"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Production
                  <HeaderTabLinkCountBadge count={30} />
                </span>
              }
              key="4"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Inactive
                  <HeaderTabLinkCountBadge count={5} />
                </span>
              }
              key="5"
            />
            <TabPane
              tab={
                <span className="page-tab-link">
                  Error
                  <HeaderTabLinkCountBadge count={2} />
                </span>
              }
              key="6"
            />
          </Tabs>
        }
      />
    </>
  );
}

export { HeaderFrame };
