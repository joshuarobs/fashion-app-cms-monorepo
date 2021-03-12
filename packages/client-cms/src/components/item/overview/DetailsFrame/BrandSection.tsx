import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../routes';
import { Avatar, Button, Col, Row } from 'antd';
import { NoGenericAssociationFullCol } from '../../../common/NoGenericAssociationFullCol';
import { useQuery, gql } from '@apollo/client';
import { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only } from '../../../../queries/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { Item_Details_Frame } from '../../../../strings';
import { FrameInputLabel } from '../../../common/typography/FrameInputLabel';

const size = 'small';

const styles = {
  itemFamilyCell: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'table',
    // textAlign: 'center',
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
};

const GET_BRAND = gql`
  query getBrand($id: Int!) {
    companies_by_pk(id: $id) {
      id
      name
      logo_url
      #items_aggregate {
      #  aggregate {
      #    count
      #  }
      #}
    }
  }
`;

interface BrandSectionProps {
  companyId: any;
  showPopup: any;
  hasChanged: any;
  disabled: boolean;
}

function BrandSection({
  companyId,
  showPopup,
  hasChanged,
  disabled,
}: BrandSectionProps) {
  // console.log("BrandSection > companyId:", companyId);

  const {
    loading: loadingBrand,
    error: errorBrand,
    data: dataBrand,
  } = useQuery(GET_BRAND, {
    variables: { id: companyId },
    skip: companyId === null,
  });

  const {
    loading: loadingItemsCount,
    error: errorItemsCount,
    data: dataItemsCount,
  } = useQuery(Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only, {
    variables: { id: companyId },
    skip: companyId === null,
  });

  const loading = loadingBrand || loadingItemsCount;

  // if (loading) return <div />;
  if (errorBrand) return <div>Error (Brand)! ${errorBrand}</div>;
  if (errorItemsCount)
    return <div>Error (Items Count)! ${errorItemsCount}</div>;
  // console.log("dataBrand:", dataBrand, "\ncompanyId:", companyId);
  // console.log("dataItemsCount:", dataItemsCount);
  if (loading) {
    return <div />;
  }
  // Only number of items in production
  const itemCount = dataItemsCount
    ? dataItemsCount.item_maindata_revisions_aggregate.aggregate.count
    : null;

  return (
    <>
      <Row>
        <FrameInputLabel
          text={Item_Details_Frame.Brand}
          span={12}
          hasChanged={hasChanged}
        />
        {!loading && dataBrand && dataBrand.companies_by_pk && (
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button size={size} onClick={showPopup} disabled={disabled}>
              Change
            </Button>
          </Col>
        )}
      </Row>
      {!loading && !dataBrand && (
        <NoGenericAssociationFullCol
          itemName="Brand"
          onClick={showPopup}
          disabled={disabled}
        />
      )}
      {!loading && dataBrand && dataBrand.companies_by_pk && (
        <Link
          className="no-blue"
          to={Routes.Companies__Company + '/' + dataBrand.companies_by_pk.id}
        >
          <Row
            style={{
              padding: 8,
              borderRadius: 4,
              border: '1px solid #D9D9D9',
              marginTop: 8,
              marginBottom: 8,
              cursor: 'pointer',
            }}
          >
            <Col span={4}>
              <Avatar
                shape="square"
                size={50}
                src={dataBrand.companies_by_pk.logo_url}
              />
            </Col>
            <Col span={12} style={styles.itemFamilyCell}>
              <span style={styles.itemFamilyCellContent}>
                {dataBrand.companies_by_pk.name}
              </span>
            </Col>
            <Col span={8} style={styles.itemFamilyCell}>
              <span style={styles.itemFamilyCellContent}>
                {/*{dataBrand.companies_by_pk.items_aggregate.aggregate.count}{" "}*/}
                {itemCount} Items
              </span>
            </Col>
          </Row>
        </Link>
      )}
    </>
  );
}

export { BrandSection };
