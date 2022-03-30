import React, { useState } from 'react';
import { Button, Col, Row, Switch, Typography } from 'antd';
import { MediaSmallCardAdd } from '../../../../common/media/MediaSmallCardAdd';
import { MediaSmallCard } from '../../../../common/media/MediaSmallCard';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { SwitchElement } from '../../../../common/SwitchElement';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';

const { Paragraph } = Typography;

interface AssociatedMediaSectionProps {
  showTitle?: boolean;
}

function AssociatedMediaSection({
  showTitle = false,
}: AssociatedMediaSectionProps) {
  const [viewGuidelines, setViewGuidelines] = useState(false);

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
            <span
              style={{
                marginRight: 12,
              }}
            >
              View Guidelines
            </span>
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
      <Row style={{ marginTop: 12 }}>
        <MediaSmallCard onClick={() => {}} />
        <MediaSmallCard onClick={() => {}} />
        <MediaSmallCard onClick={() => {}} />
        <MediaSmallCardAdd onClick={() => {}} />
      </Row>
    </div>
  );
}

export { AssociatedMediaSection };
