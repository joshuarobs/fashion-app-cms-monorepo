import React from 'react';
import { Link } from 'react-router-dom';
import { RouteStrings } from '../../../../routeStrings';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import { NoGenericAssociationFullCol } from '../../../common/NoGenericAssociationFullCol';
import { Edit_Related, Item_Details_Frame } from '../../../../strings';
import { FrameInputLabel } from '../../../common/typography/FrameInputLabel';

const { Title, Text } = Typography;

const placeholderImageUrl =
  'https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg';

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

const itemsInItemFamily = [
  {
    key: 1,
    imageUrl: placeholderImageUrl,
    nickname: 'Black Non-Reflective',
    brand: 'Supreme',
  },
  {
    key: 2,
    imageUrl: placeholderImageUrl,
    nickname: 'Red Non-Reflective',
    brand: 'adidas',
  },
];

interface ItemFamilySectionProps {
  item_family?: any;
  id?: any;
  disabled?: boolean;
  hasChanged?: any;
}

function ItemFamilySection({
  item_family,
  id,
  disabled,
  hasChanged,
}: ItemFamilySectionProps) {
  let title = Item_Details_Frame.Item_Family;
  if (hasChanged) title += Edit_Related.Asterisks_2;

  return (
    <>
      <Row>
        {/* @ts-ignore */}
        <FrameInputLabel text={title} span={12} mark={hasChanged} />
        {item_family && (
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button size={size} disabled={disabled}>
              Change
            </Button>
          </Col>
        )}
      </Row>
      {item_family && (
        <Link to={RouteStrings.Item_Families + '/' + item_family.id}>
          <Row
            style={{
              padding: 8,
              borderRadius: 4,
              border: '1px dashed #D9D9D9',
              marginTop: 8,
              cursor: 'pointer',
            }}
          >
            <Col span={4}>
              <Avatar shape="square" size={50} src={placeholderImageUrl} />
            </Col>
            <Col span={8} style={styles.itemFamilyCell}>
              <span style={styles.itemFamilyCellContent}>
                {item_family.name}
              </span>
            </Col>
            <Col span={6} style={styles.itemFamilyCell}>
              <span style={styles.itemFamilyCellContent}>
                {item_family.brand.name}
              </span>
            </Col>
            <Col span={6} style={styles.itemFamilyCell}>
              <span style={styles.itemFamilyCellContent}>
                {item_family.items.length} Items
              </span>
            </Col>
          </Row>
        </Link>
      )}
      {item_family && item_family.items.length > 1 && (
        <>
          <Row style={styles.sectionTitle}>
            <Text strong>Other Items in Item Family</Text>
          </Row>
          <div
            style={{
              padding: 8,
              borderRadius: 4,
              border: '1px dashed #D9D9D9',
              marginTop: 8,
            }}
          >
            <Row style={styles.sectionTitle}>
              <Col span={4} style={{ ...styles.itemFamilyCell, height: 32 }}>
                <span style={styles.itemFamilyCellContent}>
                  <Text strong>Image</Text>
                </span>
              </Col>
              <Col span={10} style={{ ...styles.itemFamilyCell, height: 32 }}>
                <span style={styles.itemFamilyCellContent}>
                  <Text strong>Nickname</Text>
                </span>
              </Col>
              <Col span={6} style={{ ...styles.itemFamilyCell, height: 32 }}>
                <span style={styles.itemFamilyCellContent}>
                  <Text strong>Brand</Text>
                </span>
              </Col>
              <Col span={4} style={{ ...styles.itemFamilyCell, height: 32 }}>
                <span
                  style={{
                    ...styles.itemFamilyCellContent,
                    textAlign: 'center',
                  }}
                >
                  <Text strong>Action</Text>
                </span>
              </Col>
            </Row>
            {item_family.items.map((item: any, index: any) => {
              // TODO: Delete later when you have actual images
              item.imageUrl = placeholderImageUrl;
              // Ignore the item of the this page
              if (item.id !== id) {
                const marginBottom =
                  index < itemsInItemFamily.length - 1 &&
                  itemsInItemFamily.length > 2
                    ? 12
                    : 0;
                return (
                  <Row
                    key={index}
                    style={{
                      marginBottom,
                    }}
                  >
                    <Col span={4}>
                      <Avatar shape="square" size={50} src={item.imageUrl} />
                    </Col>
                    <Col span={10} style={styles.itemFamilyCell}>
                      <span style={styles.itemFamilyCellContent}>
                        {item.name}
                      </span>
                    </Col>
                    <Col span={6} style={styles.itemFamilyCell}>
                      <span style={styles.itemFamilyCellContent}>
                        {item.brand.name}
                      </span>
                    </Col>
                    <Col span={4} style={styles.itemFamilyCell}>
                      <span
                        style={{
                          ...styles.itemFamilyCellContent,
                          textAlign: 'center',
                        }}
                      >
                        <Link
                          to={
                            RouteStrings.Items__Clothing__Item + '/' + item.id
                          }
                        >
                          View
                        </Link>
                      </span>
                    </Col>
                  </Row>
                );
              }
            })}
          </div>
        </>
      )}
      {!item_family && (
        <NoGenericAssociationFullCol
          itemName="Item Family"
          disabled={disabled}
        />
      )}
    </>
  );
}

export { ItemFamilySection };
