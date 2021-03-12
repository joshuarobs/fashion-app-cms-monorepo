import React from 'react';
import * as _ from 'lodash';
import { Table, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { green } from '@ant-design/colors';
import { TagInProduction } from '../../../../common/localisation/TagInProduction';
import { TagInReview } from '../../../../common/localisation/TagInReview';
import { TagInDevelopment } from '../../../../common/localisation/TagInDevelopment';
import { DataState } from '@joshuarobs/clothing-enums';
import { TagInRetirement } from '../../../../common/localisation/TagInRetirement';
import { TagError } from '../../../../common/localisation/TagError';

interface LocalisationsTableProps {
  item_translations: any;
}

function LocalisationsTable({ item_translations }: LocalisationsTableProps) {
  const itemTranslations = _.cloneDeep(item_translations);
  itemTranslations.forEach((translation: any, index: any) => {
    translation.key = index;
  });
  console.log('itemTranslations:', itemTranslations);

  const columns = [
    {
      title: 'Locale',
      dataIndex: ['locale', 'name'],
      key: 'locale',
      width: 240,
      render: (text: any, record: any) => {
        return (
          <Link to={record.path}>
            <span style={{ color: 'rgba(0, 0, 0, 1)' }}>
              {text.substring(0, 4)}
            </span>
            <span style={{ paddingLeft: '4px' }}> </span>
            <span>{text.substring(4, text.length)}</span>
          </Link>
        );
      },
    },
    {
      title: 'Progress',
      key: 'Progress',
      width: 160,
      render: (text: any, record: any) => {
        console.log('record:', record);
        const key = `${record.key}:text`;

        const companyTranslation =
          record.company_translations.length > 0
            ? record.company_translations[0]
            : null;

        // Calculate the percentage of texts done
        let count = 0;
        if (companyTranslation) {
          if (companyTranslation.stylised_name) count += 1;
          if (companyTranslation.short_name) count += 1;
          if (companyTranslation.bio) count += 1;
        }

        // How many fields of text or images in a given locale
        const numberOfFields = 3;

        switch (record.state) {
          // Add progress if the locale is released, i.e. at least review
          case DataState.Review:
            count += numberOfFields;
            break;
          // Add progress if the locale is in production (finished reviewing)
          case DataState.Production:
          case DataState.Retired:
            count += 2 * numberOfFields;
            break;
        }

        // Total is based of number of fields, if review is done and if
        // published
        const total = numberOfFields * 3;
        let percentage = Math.round((count / total) * 100);
        if (percentage === 33) percentage += 1;

        return (
          <Link to={record.path}>
            <Progress percent={percentage} steps={3} strokeColor={green[3]} />
          </Link>
        );
      },
    },
    {
      title: 'Rev.',
      key: 'revision',
      // dataIndex: "revision",
      width: 80,
      render: (text: any, record: any) => (
        <Link
          to={record.path}
          style={{
            marginLeft: '0px !important',
          }}
        >
          {record.revision}
        </Link>
      ),
    },
    {
      title: 'State',
      key: 'state',
      width: 80,
      render: (record: any) => {
        // console.log("RECORDDD:", record);
        const { state, company_translations } = record;
        if (company_translations.length === 0) {
          return (
            <Link to={record.path}>
              <TagError />
            </Link>
          );
        }
        switch (state) {
          case DataState.Development:
            return (
              <Link to={record.path}>
                <TagInDevelopment showShortText />
              </Link>
            );
          case DataState.Review:
            return (
              <Link to={record.path}>
                <TagInReview showShortText />
              </Link>
            );
          case DataState.Production:
            return (
              <Link to={record.path}>
                <TagInProduction showShortText />
              </Link>
            );
          case DataState.Retired:
            return (
              <Link to={record.path}>
                <TagInRetirement showShortText />
              </Link>
            );
          default:
            return <div />;
        }
      },
    },
  ];

  return (
    <Table
      style={{
        width: '100%',
        // calc(100vw - 304px)
      }}
      columns={columns}
      dataSource={itemTranslations}
      pagination={false}
    />
  );
}

export { LocalisationsTable };
