/**
 * Figma reference:
 * Components/Item/Element - Details
 */

import React, { useState, useEffect } from 'react';
import { ExperimentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Alert,
  Checkbox,
  Layout,
  Empty,
  DatePicker,
  Row,
  Col,
  Select,
  InputNumber,
  Radio,
  Input,
  Button,
  Typography,
  Cascader,
  message,
  Tooltip,
  Divider,
} from 'antd';
import { useMutation, gql, useLazyQuery, useQuery } from '@apollo/client';
import { UnsavedChangesCard } from '../../../common/UnsavedChangesCard';
import { Common, Fabric_Layer_Details_Frame } from '../../../../strings';
import { FrameTitle } from '../../../common/typography/FrameTitle';
import { Update_Company } from '../../../../queries/companies/updateCompany';
import { SelectCountryOfBrandOrigin } from '../../../common/data-entry/SelectCountryOfBrandOrigin/_SelectCountryOfBrandOrigin';
import { FrameInputLabel } from '../../../common/typography/FrameInputLabel';
import { companies } from '../../../../utils/gql-interfaces/companies';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { fabric_layers } from '../../../../utils/gql-interfaces/fabric_layers';
import { FrameTitleLevel2 } from '../../../common/typography/FrameTitleLevel2';
import { TotalPercentRow } from '../../../fabric-layers/HeaderFrame/TotalPercentRow';
import { SelectColourMixPartsModal } from '../../../fabric-layers/HeaderFrame/SelectColourMixPartsModal';
import { AddedColourMixPartsTable } from '../../../fabric-layers/HeaderFrame/AddedColourMixPartsTable';
import { Get_Colour_Mix_Parts_Multiple_By_Ids } from '../../../../queries/colour_mix_parts/getColourMixPartsMultipleByIds';

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

const key = 'unsaved-changes-overview';

const gutter = 16;

const styles = {
  itemFamilyCell: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'table',
  },
  itemFamilyCellContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  sectionTitle: {
    marginTop: 8,
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
  radioStyle: {
    // display: "block",
    height: '32px',
    lineHeight: '32px',
  },
};

interface DetailsFrameProps {
  data: fabric_layers;
}

function DetailsFrame({ data }: DetailsFrameProps) {
  const [fabric_layer_type, setFabricLayerType] = useState(
    FabricLayerType.Shell
  );
  const [colour_pattern, setColourPattern] = useState('');
  const [notes, setNotes] = useState<string>();
  const [thickness, setThickness] = useState<number | null>(null);
  const [insulation, setInsulation] = useState<number | null>(0);
  const [density, setDensity] = useState<number | null>(0);
  const [permeability, setPermeability] = useState<number | null>(0);
  const [colour_mix_parts, setColourMixParts] = useState<any[]>([]);
  const [colourMixPartsIds, setColourMixPartsIds] = useState<number[]>([]);

  const [showSelectColourMixPartsModal, setShowSelectColourMixPartsModal] =
    useState(false);

  console.error('data77:', data);

  // Lazy query for loading the selected colour mix parts
  const [
    loadColourMixParts,
    {
      called: calledColourMixParts,
      loading: loadingColourMixParts,
      data: dataColourMixParts,
    },
  ] = useLazyQuery(Get_Colour_Mix_Parts_Multiple_By_Ids, {
    variables: { ids: colourMixPartsIds },
    onCompleted: (data) => {
      console.log('onCompleted:', data.getColourMixPartsMultipleByIds);
      const colourMixParts: any[] = [];
      data.getColourMixPartsMultipleByIds.forEach(
        // @ts-ignore
        (item) => colourMixParts.push(item)
      );
      setColourMixParts(colourMixParts);
    },
  });

  console.log('dataColourMixParts:', dataColourMixParts);

  useEffect(() => {
    setFabricLayerType(data.fabric_layer_type);
    setNotes(data.notes);
    setThickness(data.thickness);
    setInsulation(data.insulation);
    setDensity(data.density);
    setPermeability(data.permeability);
    // setColourMixParts(data.fabric_layer_and_colour_mix_parts);
    const colourMixPartsIds: any[] = [];
    data.fabric_layer_and_colour_mix_parts.forEach(
      // @ts-ignore
      ({ colour_mix_part_id }) => colourMixPartsIds.push(colour_mix_part_id)
    );
    // setColourMixParts(colourMixParts);
    setColourMixPartsIds(colourMixPartsIds);
    loadColourMixParts().then();
  }, [data]);

  // Hooks for GraphQL queries
  const [updateCompany, { loading: mutationLoading, error: mutationError }] =
    useMutation(Update_Company, {
      onCompleted() {},
      refetchQueries: [],
    });

  // Lazy query for loading the selected colour mix parts
  // const {
  //   loading: loadingColourMixParts,
  //   error: errorColourMixParts,
  //   data: dataColourMixParts,
  // } = useQuery(Get_Colour_Mix_Parts_Multiple_By_Ids, {
  //   variables: { ids: colourMixPartsIds },
  // });
  //
  // if (loadingColourMixParts) return <div />;

  const hasChanged = {
    fabric_layer_type: fabric_layer_type !== data.fabric_layer_type,
    // colour_pattern: colour_pattern !== data.colour_pattern,
    notes: notes !== data.notes,
    thickness: thickness !== data.thickness,
    insulation: insulation !== data.insulation,
    density: density !== data.density,
    permeability: permeability !== data.permeability,
    // founding_date: founding_date !== data.founding_date,
    // founded_in_id: founded_in_id !== data.founded_in_id,
  };

  // console.error("hasChanged:", hasChanged);

  let numberOfChanges = 0;
  Object.keys(hasChanged).forEach((key) => {
    // @ts-ignore
    if (hasChanged[key]) {
      numberOfChanges++;
    }
  });

  const onChange = (checkedValues: any) => {
    // setOccasions(checkedValues);
  };

  const discardChanges = () => {
    // setColourPattern(data.colour_pattern);
    setFabricLayerType(data.fabric_layer_type);
    setNotes(data.notes);
    setThickness(data.thickness);
    setInsulation(data.insulation);
    setDensity(data.density);
    setPermeability(data.permeability);
    // setColourMixParts(data.logo_url);
  };

  interface changesProps {
    fabric_layer_type?: string;
    notes?: string | null;
    thickness?: number | null;
    insulation?: number | null;
    density?: number | null;
    permeability?: number | null;
    colour_mix_parts?: [];
  }

  const changes: changesProps = {};

  const saveChanges = async () => {
    if (numberOfChanges > 0) {
      const variables = {
        id: data.id,
        changes,
      };

      if (hasChanged.fabric_layer_type) {
        variables.changes.fabric_layer_type = fabric_layer_type;
      }

      if (hasChanged.notes) {
        variables.changes.notes = notes;
      }

      if (hasChanged.thickness) {
        variables.changes.thickness = thickness;
      }

      if (hasChanged.insulation) {
        variables.changes.insulation = insulation;
      }

      if (hasChanged.density) {
        variables.changes.density = density;
      }

      if (hasChanged.permeability) {
        variables.changes.permeability = permeability;
      }

      // if (hasChanged.colour_mix_parts) {
      //   variables.changes.colour_mix_parts = colour_mix_parts;
      // }

      message.loading({ content: Common.Saving_Changes, key }).then();
      await updateCompany({ variables });
      message.success({ content: Common.Changes_Saved, key }, 2);
    }
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes
  const onPressEnterName = () => {
    // if (numberOfChanges === 1 && hasChanged.name) {
    //   saveChanges();
    // }
  };

  const onPressEnterWebsiteUrl = () => {
    // if (numberOfChanges === 1 && hasChanged.website_url) {
    //   saveChanges();
    // }
  };

  // Functions - Select Colour Mix Parts Modal
  const onClickSelectColourMixPartsModal = () => {
    setShowSelectColourMixPartsModal(true);
  };

  const onCancelSelectColourMixPartsModal = () => {
    setShowSelectColourMixPartsModal(false);
  };

  let totalPercent = 0;
  data.fabric_layer_and_colour_mix_parts.forEach(
    // @ts-ignore
    ({ colour_mix_part }) => (totalPercent += colour_mix_part.percent)
  );

  const percentIsNot100 = totalPercent !== 1;
  const totalPercentError =
    data.fabric_layer_and_colour_mix_parts.length > 0 && percentIsNot100;

  return (
    <>
      <SelectColourMixPartsModal
        showModal={showSelectColourMixPartsModal}
        onCancel={onCancelSelectColourMixPartsModal}
        // onSubmit={onSubmitSelectColourMixPartsModal}
        loading={mutationLoading}
        // newColourMixParts={colour_mix_parts}
        setNewColourMixParts={setColourMixParts}
        loadColourMixParts={() => {}}
        // loadColourMixParts={loadColourMixParts}
        // rowSelection={rowSelection}
        // onSelectColourMixPartsModal={}
      />
      <UnsavedChangesCard
        numberOfChanges={numberOfChanges}
        discardChanges={discardChanges}
        saveChanges={saveChanges}
      />
      <Content
        style={{
          minHeight: 280,
          // maxWidth: 412,
        }}
      >
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 4,
          }}
        >
          {/* ============================== */}
          {/* FABRIC LAYER TYPE + COLOUR PATTERN + NOTES */}
          {/* ============================== */}
          <Row>
            <Col span={16}>
              <FrameTitleLevel2
                text={Fabric_Layer_Details_Frame.General_Information}
                noMargin
                typeIsSecondary
              />
            </Col>
          </Row>
          <Row style={styles.sectionTitle} gutter={gutter}>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Fabric_Layer_Type}
                hasChanged={hasChanged.fabric_layer_type}
                span={6}
                noColumn
              />
            </Col>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Colour_Pattern}
                // hasChanged={hasChanged.fabric_layer_type}
                span={6}
                noColumn
              />
            </Col>
            <Col span={12}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Notes}
                hasChanged={hasChanged.notes}
                span={6}
                noColumn
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={6}>
              <Select
                value={fabric_layer_type}
                style={{ width: '100%' }}
                // @ts-ignore
                onChange={(value) => setFabricLayerType(value)}
              >
                <Option value={FabricLayerType.Shell}>Shell</Option>
                <Option value={FabricLayerType.Fill}>Fill</Option>
                <Option value={FabricLayerType.Interlining}>Lining</Option>
                <Option value={FabricLayerType.Lining}>Interlining</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                defaultValue="solid"
                style={{ width: '100%' }}
                // onChange={(e) => setColourPattern(e.target.value)}
              >
                <Option value="solid">Solid</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                // onPressEnter={onPressEnterName}
              />
            </Col>
          </Row>
          <Divider />
          {/* ============================== */}
          {/* THERMAL ATTRIBUTES */}
          {/* ============================== */}
          <Row>
            <FrameTitleLevel2
              text={Fabric_Layer_Details_Frame.Thermal_Attributes}
              noMargin
              typeIsSecondary
            />
          </Row>
          <Row style={styles.sectionTitle} gutter={gutter}>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Thickness}
                hasChanged={hasChanged.thickness}
                span={6}
                noColumn
              />
            </Col>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Insulation_Points}
                hasChanged={hasChanged.insulation}
                span={6}
                noColumn
              />
            </Col>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Density}
                hasChanged={hasChanged.density}
                span={6}
                noColumn
              />
            </Col>
            <Col span={6}>
              <FrameInputLabel
                text={Fabric_Layer_Details_Frame.Permeability}
                hasChanged={hasChanged.permeability}
                span={6}
                noColumn
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={6}>
              <InputNumber
                style={{ width: '100%' }}
                value={thickness ? thickness : undefined}
                onChange={(value) => setThickness(value)}
                min={0}
                // onPressEnter={onPressEnterName}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                style={{ width: '100%' }}
                value={insulation ? insulation : undefined}
                onChange={(value) => setInsulation(value)}
                min={0}
                // onPressEnter={onPressEnterName}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                style={{ width: '100%' }}
                value={density ? density : undefined}
                onChange={(value) => setDensity(value)}
                min={0}
                // onPressEnter={onPressEnterName}
              />
            </Col>
            <Col span={6}>
              <InputNumber
                style={{ width: '100%' }}
                value={permeability ? permeability : undefined}
                onChange={(value) => setPermeability(value)}
                min={0}
                // onPressEnter={onPressEnterName}
              />
            </Col>
          </Row>
          <Divider />
          {/* ============================== */}
          {/* COLOUR MIX PARTS */}
          {/* ============================== */}
          <Row>
            <FrameTitleLevel2
              text={Fabric_Layer_Details_Frame.Colour_Mix_Parts}
              noMargin
              typeIsSecondary
            />
          </Row>
          <Row style={styles.sectionTitle}>
            <AddedColourMixPartsTable
              data={colour_mix_parts}
              loading={loadingColourMixParts}
              isTwoColumns
            />
          </Row>
          <Row style={styles.sectionTitle}>
            <TotalPercentRow
              totalPercent={totalPercent}
              totalPercentError={totalPercentError}
            />
          </Row>
          <Row style={styles.sectionTitle}>
            <Button
              style={{ width: '100%' }}
              icon={<ExperimentOutlined />}
              onClick={onClickSelectColourMixPartsModal}
            >
              {Fabric_Layer_Details_Frame.Select_Colour_Mix_Parts}
            </Button>
          </Row>
        </div>
      </Content>
    </>
  );
}

export { DetailsFrame };
