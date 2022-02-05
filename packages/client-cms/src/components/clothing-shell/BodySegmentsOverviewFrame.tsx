import React from 'react';
import { Layout, Typography, Tree } from 'antd';
import { ColumnWidthOutlined, GatewayOutlined } from '@ant-design/icons';
import { enumWithoutUnderscores } from '../../utils/enumWithoutUnderscores';
import { generateOverviewTreeFabricLayerData } from '../../utils/generateOverviewTreeFabricLayerData';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { FrameTitle } from '../common/typography/FrameTitle';

const { Text } = Typography;
const { Content } = Layout;

const size = 'small';

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

interface BodySegmentsOverviewFrameProps {
  clothingShell: any;
}

function BodySegmentsOverviewFrame({
  clothingShell,
}: BodySegmentsOverviewFrameProps) {
  console.log('clothingShell:', clothingShell);

  const { clothing_shell_and_body_segment_masks } = clothingShell;

  // console.log(
  //   "clothing_shell_and_body_segment_masks:",
  //   clothing_shell_and_body_segment_masks
  // );

  //==================================================
  // GENERATE TREE DATA
  //==================================================
  const treeData = [];
  //========================================
  // GENERATE FOR DEFAULT LAYERS
  //========================================
  const { default_shell_layer, default_fill_layer, default_lining_layer } =
    clothingShell;

  const treeDataItemDefaults = {
    title: <Text strong>DEFAULT FABRIC LAYERS</Text>,
    key: `$-1-0`,
    children: [],
  };

  // Shell layer
  if (default_shell_layer) {
    treeDataItemDefaults.children.push(
      // @ts-ignore
      generateOverviewTreeFabricLayerData(
        default_shell_layer,
        FabricLayerType.Shell,
        'd1'
      )
    );
  }

  // Lining layer
  if (default_lining_layer) {
    treeDataItemDefaults.children.push(
      // @ts-ignore
      generateOverviewTreeFabricLayerData(
        default_lining_layer,
        FabricLayerType.Lining,
        'd3'
      )
    );
  }

  if (treeDataItemDefaults.children.length > 0) {
    treeData.push(treeDataItemDefaults);
  }

  //========================================
  // GENERATE FOR EACH BODY SEGMENT
  //========================================
  clothing_shell_and_body_segment_masks.forEach((item: any, index: any) => {
    const newItem = item.body_segment_mask;
    const {
      body_segment,
      body_segment_mask_shape,
      fill_percent,
      uniform_segment_thickness,
      shell_layer,
    } = newItem;
    // newTreeData.push(newItem);

    const treeDataItem = {
      title: <Text strong>{enumWithoutUnderscores(body_segment.name)}</Text>,
      key: `${index}-0`,
      children: [
        {
          title: `${body_segment_mask_shape} - ${fill_percent * 100}%`,
          key: `${index}-0-0`,
          icon: <GatewayOutlined />,
        },
      ],
    };

    // Shell layer
    if (shell_layer) {
      treeDataItem.children.push(
        // @ts-ignore
        generateOverviewTreeFabricLayerData(
          shell_layer,
          FabricLayerType.Shell,
          index
        )
      );
    }

    // shell layer,
    // fabric_layer_and_colour_mix_parts[0].colour_mix_part.colour.name
    //.percent

    // If there is a uniform thickness
    if (uniform_segment_thickness) {
      treeDataItem.children.push({
        title: `${uniform_segment_thickness}mm`,
        icon: <ColumnWidthOutlined />,
        key: `${index}-0-${treeDataItem.children.length}`,
      });
    }

    treeData.push(treeDataItem);
  });
  // const t = clothing_shell_and_body_segment_masks[0].body_segment_mask;

  console.log('treeData:', treeData);

  return (
    <Content
      style={{
        // minHeight: 280,
        // maxWidth: 412,
        // margin: "0px 12px 0px 12px"
        marginBottom: 24,
      }}
    >
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        <FrameTitle text="Body Segments OverviewTab" />
        <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={[]}
          selectable={false}
          treeData={treeData}
          // @ts-ignore
          switcherIcon={null}
        />
      </div>
    </Content>
  );
}

export { BodySegmentsOverviewFrame };
