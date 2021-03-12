import React from 'react';
import { Col, Row, Typography } from 'antd';
import { MiniStatistic } from '../MiniStatistic';
import { ModelDrawingDisplaySection } from '../ModelDrawingDisplaySection';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { LaptopSizePreset } from '../../../../../utils/LaptopSizePreset';

const { Text } = Typography;

const styles = {
  ratingTitle: {
    marginTop: 4,
  },
  rating: {
    fontSize: '1.2em',
    marginBottom: 4,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
};

interface ModelAndStatisticsProps {
  bodyCoverage: number | null;
  weight: number | null;
  clothingSegmentsData: ClothingSegmentsData;
  isPopup?: boolean;
  laptopSizePreset?: LaptopSizePreset;
}

function ModelAndStatistics({
  bodyCoverage,
  weight,
  clothingSegmentsData,
  isPopup,
  laptopSizePreset = LaptopSizePreset.MacBookPro16,
}: ModelAndStatisticsProps) {
  let maxHeight: string | number = 'initial';
  let overflowY: string | number = 'initial';
  if (isPopup) {
    switch (laptopSizePreset) {
      case LaptopSizePreset.MacBookPro16:
        maxHeight = 580;
        overflowY = 'scroll';
        break;
      case LaptopSizePreset.MacBookPro13:
        maxHeight = 500;
        overflowY = 'scroll';
        break;
    }
  }

  return (
    <Row>
      <Col
        span={10}
        style={{
          overflowY: !isPopup ? 'initial' : 'scroll',
          maxHeight,
        }}
      >
        <Text type="secondary" strong>
          Overall
        </Text>
        <br />
        <MiniStatistic
          title={'Body Coverage'}
          value={bodyCoverage ? `${bodyCoverage}%` : null}
        />
        <br />
        <Text type="secondary" strong>
          Relative
        </Text>
        <br />
        <div style={styles.ratingTitle}>
          <span>Weather Comfort</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>80%</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Skin Comfort</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>80%</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Fit Comfort</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>80%</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Psychological Comfort</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>70%</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Insulation Points</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>5 out of 10 (Feet)</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Local Related Coverage</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>100% (Feet)</strong>
          <br />
        </div>
        <div style={styles.ratingTitle}>
          <span>Wind and Water Resistance</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>40%</strong>
          <br />
        </div>
        <MiniStatistic title={'Weight'} value={weight ? `${weight}g` : null} />
        <div style={styles.ratingTitle}>
          <span>Softness</span>
          <br />
        </div>
        <div style={styles.rating}>
          <strong>75%</strong>
          <br />
        </div>
      </Col>
      <Col
        span={14}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ModelDrawingDisplaySection
          clothingSegmentsData={clothingSegmentsData}
          isPopup={isPopup}
          laptopSizePreset={laptopSizePreset}
        />
      </Col>
    </Row>
  );
}

export { ModelAndStatistics };
