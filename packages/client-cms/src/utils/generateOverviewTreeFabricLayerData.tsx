import {
  BgColorsOutlined,
  BuildOutlined,
  GoldFilled,
  LayoutFilled,
  BlockOutlined,
} from '@ant-design/icons';
import { enumToCamelCase } from './enumToCamelCase';

function generateOverviewTreeFabricLayerData(
  fabricLayer: any,
  fabricLayerType: any,
  index = 0,
  noParent = false,
  overrideData: any
) {
  // console.error("fabricLayer", fabricLayer);

  const filledIconStyle = {
    opacity: 0.55,
  };

  const title = fabricLayerType ? enumToCamelCase(fabricLayerType) : '';

  const fabricLayerData = {
    title,
    key: `${index}-${title}`,
    icon: <BlockOutlined />,
    children: [],
  };
  const fabricLayerDataArray: any[] = [];
  // An array to hold the result of showing colours in a pie chart for the
  // clothing shell overview frame
  const arrayForShowingColours = [];

  if (fabricLayer || overrideData) {
    const colorMixParts = fabricLayer
      ? fabricLayer.fabric_layer_and_colour_mix_parts
      : null;
    // console.error("colorMixParts:", colorMixParts);

    if (overrideData) {
      console.log('overrideData:', overrideData);
      const { color, fabric, materials } = overrideData;
      // let a = 0;
      // let b = 1;
      // ----------------------------------------
      // Display the fabric
      // ----------------------------------------
      if (fabric) {
        fabricLayerDataArray.push({
          title: fabric.name,
          key: `${index}-fabric-0`,
          icon: <LayoutFilled style={filledIconStyle} />,
        });
      }
      // ----------------------------------------
      // Display the materials
      // ----------------------------------------
      const materialData: any[] = [];
      if (materials) {
        const materialsIsArray = Array.isArray(materials);
        // Put either the single object into an array, or copy existing array
        const newMaterials = !materialsIsArray ? [materials] : materials;
        // @ts-ignore
        newMaterials.forEach((material, index2) => {
          console.log('material:', material);
          const { percent } = material;
          // let name = !materialsIsArray ? material.name : material.material.name;
          const name = !materialsIsArray
            ? material.name
            : material.material.name;
          let title;
          const newStylisedTitle =
            name.charAt(0).toLocaleLowerCase() + name.slice(1);
          if (materialsIsArray) {
            title = `${material.percent}% ${newStylisedTitle}`;
          } else {
            title = `100% ${newStylisedTitle}`;
          }
          materialData.push({
            title,
            key: `${index}-materials-${index2}`,
            icon: <GoldFilled style={filledIconStyle} />,
          });
        });
      }
      // ----------------------------------------
      // Display the colours
      // ----------------------------------------
      if (noParent) {
        materialData.forEach((item) => fabricLayerDataArray.push(item));
      } else {
        materialData.forEach((item) =>
          // @ts-ignore
          fabricLayerDataArray.children.push(item)
        );
      }
    }

    // Check to see if there's any percentages set in all of them
    // If even one value has a percentage of 0 or null, or it doesn't add
    // up to 100, then it's assumed that the distribution is equal between
    // the number of mix parts
    // e.g. if we have 3 mix parts of percentages, 20%, 33% and 33%, it's
    // assumed that the 20% is an error/mistake and thus it will be
    // displayed and considered as 33% each
    let totalPercent = 0;

    if (colorMixParts) {
      // @ts-ignore
      colorMixParts.forEach(({ colour_mix_part }) => {
        if (colour_mix_part.percent) totalPercent += colour_mix_part.percent;
      });

      const overridePercent = 100 / colorMixParts.length;

      // @ts-ignore
      colorMixParts.forEach(({ colour_mix_part }, index2) => {
        const percent =
          totalPercent === 1 ? colour_mix_part.percent * 100 : overridePercent;

        // Display the percent alongside the colour name IF its not 100%
        const colorMixPart = {
          title:
            percent === 100
              ? colour_mix_part.colour.name
              : `${colour_mix_part.colour.name} - ${percent}%`,
          baseColour: colour_mix_part.colour.name,
          key: `${index}-shell-color-${index2}`,
          icon: <BgColorsOutlined />,
        };
        if (noParent) {
          fabricLayerDataArray.push(colorMixPart);
        } else {
          // @ts-ignore
          fabricLayerData.children.push(colorMixPart);
        }
      });
    }
  }

  // After all the info of the fabric layer has been added, add it to
  // the body segment
  // treeDataItem.children.push(shell);
  if (noParent) {
    return fabricLayerDataArray;
  } else {
    return fabricLayerData;
  }
}

export { generateOverviewTreeFabricLayerData };
