import React, { useState } from 'react';
import { Button, Col, Row, Switch, Typography } from 'antd';
import { MediaSmallCardAdd } from '../../../../common/media/MediaSmallCardAdd';
import { MediaSmallCard } from '../../../../common/media/MediaSmallCard';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { SwitchElement } from '../../../../common/SwitchElement';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';

const { Paragraph, Text } = Typography;

interface AssociatedMediaSectionProps {
  mediaItemAssociated: [];
  showTitle?: boolean;
}

function AssociatedMediaSection({
  mediaItemAssociated,
  showTitle = false,
}: AssociatedMediaSectionProps) {
  const [viewGuidelines, setViewGuidelines] = useState(false);
  console.log('mediaItemAssociated:', mediaItemAssociated);

  return (
    <div>
      <Row>
        <Col span={16}>
          <FrameTitleLevel2 text="Associated Media" />
        </Col>
        <Col span={8}>
          <label
            style={{
              userSelect: 'none',
              padding: 6,
            }}
          >
            <Text
              style={{
                marginRight: 12,
              }}
              type="secondary"
            >
              View Guidelines
            </Text>
            <SwitchElement
              checked={viewGuidelines}
              onChange={(checked: any) => setViewGuidelines(checked)}
            />
          </label>
        </Col>
      </Row>
      {viewGuidelines && (
        <Row style={{ whiteSpace: 'pre-wrap' }}>
          {/*<Button style={{ width: '100%' }}>View Guidelines</Button>*/}
          <Typography>
            <Paragraph>
              This is the collection of all the media (images and video)
              associated with this item. These media will appear as first
              selection when choosing the 10 images to show for this item. You
              can still choose to add images to the 10 images list even if they
              aren’t associated (as shown below).
            </Paragraph>
            <Paragraph>
              Any image or video that shows the product (item) should be
              included here. Whether or not they will actually be displayed,
              will be determined in the Global Media tab, or within the locales.
            </Paragraph>
          </Typography>
        </Row>
      )}
      <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap' }}>
        {mediaItemAssociated.map(() => (
          <MediaSmallCard onClick={() => {}} />
        ))}
        <MediaSmallCardAdd onClick={() => {}} />
      </div>
    </div>
  );
}

export { AssociatedMediaSection };
