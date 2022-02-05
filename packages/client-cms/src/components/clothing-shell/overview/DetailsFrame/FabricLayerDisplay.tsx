import { Button, Col, Empty, Row, Tree, Typography } from 'antd';
import React from 'react';
import { useQuery } from '@apollo/client';
import { generateOverviewTreeFabricLayerData } from '../../../../utils/generateOverviewTreeFabricLayerData';
import { WarningFilled } from '@ant-design/icons';
import { Get_Fabric_Layer } from '../../../../queries/getFabricLayer';
import { FabricLayerType } from '@joshuarobs/clothing-framework';

const { Title, Text } = Typography;
const size = 'small';

interface FabricLayerDisplayProps {
  fabricLayerId: number | null;
  showPopup?: Function;
  removeFabricLayer?: Function;
  overrideData?: boolean;
  disabled?: boolean;
}

function FabricLayerDisplay({
  fabricLayerId,
  showPopup,
  removeFabricLayer,
  overrideData,
  disabled,
}: FabricLayerDisplayProps) {
  console.log('fabricLayerId:', fabricLayerId);

  const { loading, error, data } = useQuery(Get_Fabric_Layer, {
    variables: { id: fabricLayerId },
    skip: !fabricLayerId, //|| overrideData !== null
  });

  if (loading) return <div />;
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;
  // console.log('data22:', data);

  const treeData = [];

  if (data || overrideData) {
    const fabricLayer = data ? data.getFabricLayer : null;

    if (fabricLayer || overrideData) {
      treeData.push(
        // @ts-ignore
        ...generateOverviewTreeFabricLayerData(
          fabricLayer,
          FabricLayerType.Shell,
          // @ts-ignore
          fabricLayerId,
          true,
          overrideData
        )
      );
      // console.log("treeData2:", treeData);
    }
  }

  // RETURN EMPTY STATE FOR NO ID
  if (fabricLayerId === null && !overrideData) {
    return (
      <Row
        style={{
          // padding: 8,
          borderRadius: 4,
          border: '1px dashed #D9D9D9',
          // marginTop: 8,
          maxWidth: 182,
          // cursor: 'pointer'
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            margin: '32px auto',
          }}
          description={
            <span>
              <Text type="secondary">No Fabric Layer</Text>
            </span>
          }
        >
          {showPopup && (
            <Button
              // @ts-ignore
              type="secondary"
              size={size}
              // @ts-ignore
              onClick={showPopup}
              disabled={disabled}
            >
              Select Fabric Layer
            </Button>
          )}
        </Empty>
      </Row>
    );
  } else {
    return (
      <Col
        style={{
          // padding: 8,
          borderRadius: 4,
          border: '1px dashed #D9D9D9',
          // marginTop: 8,
          // maxWidth: 176,
          minHeight: 176,
          // cursor: 'pointer'
        }}
      >
        <Row
          style={{
            marginTop: 12,
            // maxWidth: 182
          }}
        >
          {showPopup && (
            <Button
              style={{
                margin: 'auto',
                marginBottom: 8,
              }}
              // @ts-ignore
              type="secondary"
              size={size}
              // @ts-ignore
              onClick={showPopup}
              disabled={disabled}
            >
              Change Fabric Layer
            </Button>
          )}
        </Row>
        <Row>
          {treeData.length > 0 ? (
            <Tree
              showIcon
              defaultExpandAll
              defaultSelectedKeys={[]}
              selectable={false}
              treeData={treeData}
              className="no-switchers"
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{
                margin: '12px auto',
                // marginTop: 4
              }}
              description={null}
            >
              <div>
                <Row>
                  <Text
                    type="warning"
                    strong
                    style={{
                      whiteSpace: 'pre-line',
                    }}
                  >
                    <WarningFilled /> {`Layer is empty`}
                  </Text>
                </Row>
                {!overrideData && (
                  <Row
                    style={{
                      paddingTop: 8,
                      margin: '0 auto',
                    }}
                  >
                    <Button
                      style={{ margin: 'auto' }}
                      size={size}
                      // @ts-ignore
                      onClick={removeFabricLayer}
                      disabled={disabled}
                    >
                      Remove Layer
                    </Button>
                  </Row>
                )}
              </div>
            </Empty>
          )}
        </Row>
      </Col>
    );
  }
}

export { FabricLayerDisplay };
