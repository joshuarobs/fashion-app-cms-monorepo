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
  labelDescriptions: {
    whiteSpace: 'break-spaces',
  },
};

interface TabContentFrameProps {
  hasChanged: any;
  copyStylised: any;
  disabled: boolean;
  stylised_name?: string;
  setStylisedName: Function;
  short_name?: string;
  setShortName: Function;
  bio?: string;
  setBio: Function;
  onPressEnterStylisedName: Function;
  onPressEnterShortName: Function;
}

/**
 * Similar to ContentFrame, but this just contains the data in one of it's
 * two tabs, whereby both tabs are actually the same element (this component).
 */
function TabContentFrame({
  hasChanged,
  copyStylised,
  disabled,
  stylised_name,
  setStylisedName,
  short_name,
  setShortName,
  bio,
  setBio,
  onPressEnterStylisedName,
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
        <Col span={12}>
          {!hasChanged.stylised_name ? (
            <Text
              strong
              type={!disabled && !stylised_name ? 'danger' : undefined}
            >
              Stylised Name
            </Text>
          ) : (
            <Text strong mark>
              Stylised Name**
            </Text>
          )}
        </Col>
        <Col span={8}>
          {!hasChanged.short_name ? (
            <Text
              strong
              type={
                !disabled &&
                (!short_name ||
                  !stylised_name ||
                  short_name.length > stylised_name.length)
                  ? 'danger'
                  : undefined
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
            onClick={copyStylised}
            disabled={disabled || stylised_name === short_name}
          >
            Copy Stylised
          </Button>
        </Col>
      </Row>
      {/* INPUTS - FULL NAME AND SHORT NAME */}
      <Row gutter={gutter}>
        <Col span={12}>
          <Input
            value={stylised_name}
            onChange={(e) => setStylisedName(e.target.value)}
            autoComplete="new-password"
            // @ts-ignore
            onPressEnter={onPressEnterStylisedName}
            disabled={disabled}
            className="not-bold"
          />
        </Col>
        <Col span={12}>
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
        <Col span={12}>
          {/* @ts-ignore */}
          <Text type="secondary" style={styles.labelDescriptions}>
            The short but stylised name of the company.
          </Text>
        </Col>
        <Col span={12}>
          {/* @ts-ignore */}
          <Text type="secondary" style={styles.labelDescriptions}>
            The short name of the company, non-stylised.
          </Text>
        </Col>
      </Row>
      {/* TITLE - DESCRIPTION */}
      <Row style={styles.sectionTitle} gutter={gutter}>
        <Col span={24}>
          {!hasChanged.bio ? (
            <Text strong type={!disabled && !bio ? 'danger' : undefined}>
              Bio
            </Text>
          ) : (
            <Text strong mark>
              Bio**
            </Text>
          )}
        </Col>
      </Row>
      {/* TITLE - INPUTS */}
      <Row>
        <TextArea
          rows={6}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          autoComplete="new-password"
          disabled={disabled}
          className="not-bold"
        />
      </Row>
      <Row gutter={gutter} style={styles.descriptionColumn}>
        <Col>
          <Text type="secondary">The brief biography of the company.</Text>
        </Col>
      </Row>
    </div>
  );
}

export { TabContentFrame };
