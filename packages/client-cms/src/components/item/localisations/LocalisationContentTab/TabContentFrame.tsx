import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

const gutter = 12;

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
  descriptionColumn: {
    paddingTop: 4,
  },
};

interface TabContentFrameProps {
  hasChanged: any;
  copyFull: any;
  disabled: boolean;
  full_name?: string;
  setFullName: Function;
  short_name?: string;
  setShortName: Function;
  description?: string;
  setDescription: Function;
  onPressEnterFullName: Function;
  onPressEnterShortName: Function;
}

/**
 * Similar to ContentFrame, but this just contains the data in one of it's
 * two tabs, whereby both tabs are actually the same element (this component).
 */
function TabContentFrame({
  hasChanged,
  copyFull,
  disabled,
  full_name,
  setFullName,
  short_name,
  setShortName,
  description,
  setDescription,
  onPressEnterFullName,
  onPressEnterShortName,
}: TabContentFrameProps) {
  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {/* TITLE - FULL NAME AND SHORT NAME */}
      <Row style={styles.sectionTitle} gutter={gutter}>
        <Col span={14}>
          {!hasChanged.full_name ? (
            // @ts-ignore
            <Text strong type={!disabled && !full_name ? 'danger' : ''}>
              Full Name
            </Text>
          ) : (
            <Text strong mark>
              Full Name**
            </Text>
          )}
        </Col>
        <Col span={6}>
          {!hasChanged.short_name ? (
            <Text
              strong
              // @ts-ignore
              type={
                !disabled &&
                (!short_name ||
                  !full_name ||
                  short_name.length > full_name.length)
                  ? 'danger'
                  : ''
              }
            >
              Short Name
            </Text>
          ) : (
            <Text strong mark>
              Short Name**
            </Text>
          )}
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            size="small"
            onClick={copyFull}
            disabled={disabled || full_name === short_name}
          >
            Copy Full
          </Button>
        </Col>
      </Row>
      {/* INPUTS - FULL NAME AND SHORT NAME */}
      <Row gutter={gutter}>
        <Col span={14}>
          <Input
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="new-password"
            // @ts-ignore
            onPressEnter={onPressEnterFullName}
            disabled={disabled}
            className="not-bold"
          />
        </Col>
        <Col span={10}>
          <Input
            value={short_name}
            onChange={(e) => setShortName(e.target.value)}
            autoComplete="new-password"
            // @ts-ignore
            onPressEnter={onPressEnterShortName}
            disabled={disabled}
            className="not-bold"
          />
        </Col>
      </Row>
      <Row gutter={gutter} style={styles.descriptionColumn}>
        <Col span={14}>
          <Text type="secondary">The full length name of the item.</Text>
        </Col>
        <Col span={10}>
          <Text type="secondary">A shortened and simpler name.</Text>
        </Col>
      </Row>
      {/* TITLE - DESCRIPTION */}
      <Row style={styles.sectionTitle} gutter={gutter}>
        <Col span={24}>
          {!hasChanged.description ? (
            // @ts-ignore
            <Text strong type={!disabled && !description ? 'danger' : ''}>
              Description
            </Text>
          ) : (
            <Text strong mark>
              Description**
            </Text>
          )}
        </Col>
      </Row>
      {/* TITLE - INPUTS */}
      <Row>
        <TextArea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="new-password"
          disabled={disabled}
        />
      </Row>
      <Row gutter={gutter} style={styles.descriptionColumn}>
        <Col>
          <Text type="secondary">The description of the item.</Text>
        </Col>
      </Row>
    </div>
  );
}

export { TabContentFrame };
