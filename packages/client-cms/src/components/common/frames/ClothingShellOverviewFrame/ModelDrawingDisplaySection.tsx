import React, { useState } from 'react';
import ModelImageFront from '../../../../images/front-v4.png';
import ModelImageBack from '../../../../images/back-v1.png';
import { Radio, Row } from 'antd';
import { ClothingSegmentsFront } from '../../svg/clothing-segments/ClothingSegmentsFront';
import { ClothingSegmentsBack } from '../../svg/clothing-segments/ClothingSegmentsBack';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { LaptopSizePreset } from '../../../../utils/LaptopSizePreset';

enum Tabs {
  Front = 'Front',
  Back = 'Back',
  Side_Facing_Left = 'Side_Facing_Left',
}

interface ModelDrawingDisplaySectionProps {
  clothingSegmentsData: ClothingSegmentsData;
  isPopup?: boolean;
  laptopSizePreset?: LaptopSizePreset;
}

function ModelDrawingDisplaySection({
  clothingSegmentsData,
  isPopup,
  laptopSizePreset = LaptopSizePreset.MacBookPro16,
}: ModelDrawingDisplaySectionProps) {
  const IMAGE_WIDTH = 218;
  const IMAGE_HEIGHT = 601;

  let scaleFactor = 1;
  if (isPopup) {
    switch (laptopSizePreset) {
      case LaptopSizePreset.MacBookPro16:
        scaleFactor *= 0.85;
        break;
      case LaptopSizePreset.MacBookPro13:
        scaleFactor *= 0.75;
        break;
    }
  }

  const imageStyle = {
    width: IMAGE_WIDTH * scaleFactor,
    height: IMAGE_HEIGHT * scaleFactor,
    userSelect: 'none',
  };

  const x = 0;

  const segmentRightStyle = {
    ...imageStyle,
    position: 'absolute',
  };

  const segmentLeftStyle = { ...segmentRightStyle, transform: 'scaleX(-1)' };

  const [tab, setTab] = useState(Tabs.Front);

  return (
    <div>
      <Row>
        {tab === Tabs.Front && (
          <div>
            <div
              style={{
                filter: `blur(3px) drop-shadow(${x}px ${x}px 1px #444)`,
                opacity: 0.45,
              }}
            >
              <ClothingSegmentsFront
                clothingSegmentsData={clothingSegmentsData}
                scaleFactor={scaleFactor}
              />
              <ClothingSegmentsFront
                isLeftSide
                clothingSegmentsData={clothingSegmentsData}
                scaleFactor={scaleFactor}
              />
            </div>
            {/* @ts-ignore */}
            <img src={ModelImageFront} alt="model" style={imageStyle} />
          </div>
        )}
        {tab === Tabs.Back && (
          <div>
            <div
              style={{
                filter: `blur(4px) drop-shadow(${x}px ${x}px 1px #444)`,
                opacity: 0.45,
              }}
            >
              <ClothingSegmentsBack
                clothingSegmentsData={clothingSegmentsData}
                scaleFactor={scaleFactor}
              />
              <ClothingSegmentsBack
                isRightSide
                clothingSegmentsData={clothingSegmentsData}
                scaleFactor={scaleFactor}
              />
            </div>
            {/* @ts-ignore */}
            <img src={ModelImageBack} alt="model" style={imageStyle} />
          </div>
        )}
      </Row>
      <Row>
        <Radio.Group
          value={tab}
          // size="small"
          onChange={(e) => setTab(e.target.value)}
          style={{ margin: '0 auto', marginTop: 16, userSelect: 'none' }}
        >
          <Radio.Button value={Tabs.Front}>Front</Radio.Button>
          <Radio.Button value={Tabs.Back}>Back</Radio.Button>
          <Radio.Button value={Tabs.Side_Facing_Left} disabled>
            Side
          </Radio.Button>
        </Radio.Group>
      </Row>
    </div>
  );
}

export { ModelDrawingDisplaySection };
