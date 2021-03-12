/**
 * Figma reference:
 * Components/Item/Element - Details
 */

import React, { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Alert,
  Checkbox,
  Layout,
  Empty,
  DatePicker,
  Row,
  Col,
  Select,
  InputNumber,
  Radio,
  Input,
  Button,
  Typography,
  Cascader,
  message,
} from 'antd';
import { useMutation, gql } from '@apollo/client';
import { UnsavedChangesCard } from '../common/UnsavedChangesCard';
import { Common, Item_Details_Frame } from '../../strings';
import { FrameTitle } from '../common/typography/FrameTitle';
import { Update_Company } from '../../queries/companies/updateCompany';
import { SelectCountryOfBrandOrigin } from '../common/data-entry/SelectCountryOfBrandOrigin/_SelectCountryOfBrandOrigin';
import { FrameInputLabel } from '../common/typography/FrameInputLabel';
import { companies } from '../../utils/gql-interfaces/companies';

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

const key = 'unsaved-changes-overview';

const styles = {
  itemFamilyCell: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'table',
  },
  itemFamilyCellContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
  },
  radioStyle: {
    // display: "block",
    height: '32px',
    lineHeight: '32px',
  },
};

interface DetailsFrameProps {
  data: companies;
}

function DetailsFrame({ data }: DetailsFrameProps) {
  const [name, setName] = useState(data.name ? data.name : '');
  useEffect(() => {
    setName(data.name);
  }, [data.name]);

  const [website_url, setWebsiteUrl] = useState(
    data.website_url ? data.website_url : ''
  );
  const [is_reseller, setIsReseller] = useState(data.is_reseller);

  const [is_affiliate, setIsAffiliate] = useState(data.is_affiliate);

  const [affiliate_start_date, setAffiliateStartDate] = useState(
    data.affiliate_start_date
  );

  const [logo_url, setLogoUrl] = useState(data.logo_url);

  const [short_id, setShortId] = useState(data.short_id);
  const [occasions, setOccasions] = useState();
  const [founding_date, setFoundingDate] = useState();
  const [founded_in_id, setFoundedInId] = useState(data.founded_in_id);

  // Hooks for GraphQL queries
  const [
    updateCompany,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(Update_Company, {
    onCompleted() {
      message.success({ content: Common.Changes_Saved, key }).then();
    },
  });

  const hasChanged = {
    name: name !== data.name,
    website_url: website_url !== data.website_url,
    short_id: short_id !== data.short_id,
    is_reseller: is_reseller !== data.is_reseller,
    is_affiliate: is_affiliate !== data.is_affiliate,
    affiliate_start_date: affiliate_start_date !== data.affiliate_start_date,
    logo_url: logo_url !== data.logo_url,
    // founding_date: founding_date !== data.founding_date,
    founded_in_id: founded_in_id !== data.founded_in_id,
  };

  // console.error("hasChanged:", hasChanged);

  let numberOfChanges = 0;
  Object.keys(hasChanged).forEach((key) => {
    // @ts-ignore
    if (hasChanged[key]) {
      numberOfChanges++;
    }
  });

  const onChange = (checkedValues: any) => {
    setOccasions(checkedValues);
  };

  const discardChanges = () => {
    setName(data.name);
    setWebsiteUrl(data.website_url);
    setShortId(data.short_id);
    setIsReseller(data.is_reseller);
    setIsAffiliate(data.is_affiliate);
    setAffiliateStartDate(data.affiliate_start_date);
    setLogoUrl(data.logo_url);
    setFoundedInId(data.founded_in_id);
    // document.querySelector('.ant-layout').scrollTop = 0;
  };

  interface changesProps {
    name?: string | null;
    website_url?: string | null;
    is_affiliate?: boolean;
    is_reseller?: boolean;
    affiliate_start_date?: any;
    logo_url?: string | null;
    founding_date?: any;
    founded_in_id?: number | null;
  }

  const changes: changesProps = {};

  const saveChanges = () => {
    if (numberOfChanges > 0) {
      const variables = {
        id: data.id,
        changes,
      };

      if (hasChanged.name) {
        variables.changes.name = name;
      }

      if (hasChanged.website_url) {
        variables.changes.website_url = website_url;
      }

      if (hasChanged.is_affiliate) {
        variables.changes.is_affiliate = is_affiliate;
      }

      if (hasChanged.is_reseller) {
        variables.changes.is_reseller = is_reseller;
      }

      if (hasChanged.affiliate_start_date) {
        variables.changes.affiliate_start_date = affiliate_start_date;
      }

      if (hasChanged.logo_url) {
        variables.changes.logo_url = logo_url;
      }

      if (hasChanged.founded_in_id) {
        // @ts-ignore
        variables.changes.founded_in_id = founded_in_id;
      }

      message.loading({ content: Common.Saving_Changes, key }).then();
      updateCompany({ variables }).then();
    }
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes
  const onPressEnterName = () => {
    if (numberOfChanges === 1 && hasChanged.name) {
      saveChanges();
    }
  };

  const onPressEnterWebsiteUrl = () => {
    if (numberOfChanges === 1 && hasChanged.website_url) {
      saveChanges();
    }
  };

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={numberOfChanges}
        discardChanges={discardChanges}
        saveChanges={saveChanges}
      />
      <Content
        style={{
          minHeight: 280,
          maxWidth: 412,
        }}
      >
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 4,
          }}
        >
          <Row>
            <Col span={16}>
              <FrameTitle text="General Details" noMargin />
            </Col>
          </Row>
          {/* ============================== */}
          {/* COMPANY NAME */}
          {/* ============================== */}
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Company_Name}
              hasChanged={hasChanged.name}
            />
          </Row>
          <Row>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onPressEnter={onPressEnterName}
            />
          </Row>
          {/* ============================== */}
          {/* WEBSITE URL */}
          {/* ============================== */}
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Website_Url}
              hasChanged={hasChanged.website_url}
            />
          </Row>
          <Row>
            <Input
              value={website_url}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              onPressEnter={onPressEnterWebsiteUrl}
            />
          </Row>
          {/* ============================== */}
          {/* IS RESELLER? + IS AFFILIATE? */}
          {/* ============================== */}
          <Row gutter={16} style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Is_Affiliate}
              hasChanged={hasChanged.is_affiliate}
              span={12}
            />
            <FrameInputLabel
              text={Item_Details_Frame.Is_Reseller}
              hasChanged={hasChanged.is_reseller}
              span={12}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Radio.Group
                onChange={(e) => setIsAffiliate(e.target.value)}
                value={is_affiliate}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <Radio.Group
                onChange={(e) => setIsReseller(e.target.value)}
                value={is_reseller}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {/* ============================== */}
          {/* AFFILIATE START DATE */}
          {/* ============================== */}
          <Row gutter={16} style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Affiliate_Start_Date}
              hasChanged={hasChanged.affiliate_start_date}
              span={12}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <DatePicker style={{ width: '100%' }} />
            </Col>
          </Row>
          {/* ============================== */}
          {/* LOGO URL */}
          {/* ============================== */}
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Logo_Url}
              hasChanged={hasChanged.logo_url}
            />
          </Row>
          <Row>
            <Input
              // @ts-ignore
              value={logo_url}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </Row>
          {/* ============================== */}
          {/* FOUNDING DATE + COUNTRY FOUNDED */}
          {/* ============================== */}
          <Row gutter={16} style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Founding_Date}
              hasChanged={false}
              span={12}
            />
            <FrameInputLabel
              text={Item_Details_Frame.Country_Founded}
              hasChanged={hasChanged.founded_in_id}
              span={12}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <DatePicker style={{ width: '100%' }} />
            </Col>
            <Col span={12}>
              <SelectCountryOfBrandOrigin
                founded_in_id={founded_in_id}
                setFoundedInId={setFoundedInId}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
}

export { DetailsFrame };
