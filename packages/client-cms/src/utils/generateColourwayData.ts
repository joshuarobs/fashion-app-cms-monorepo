import { Base_Colours } from './baseColours';

function generateColourwayData(fabricLayer: any) {
  const data: any[] = [];

  if (fabricLayer) {
    const colorMixParts = fabricLayer.fabric_layer_and_colour_mix_parts;
    // console.error('colorMixParts:', colorMixParts);

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

        let colour = '#000';
        // Get the color of the color
        const name = colour_mix_part.colour.name;
        const base_colour = colour_mix_part.colour.base_colour;
        const colour_code = colour_mix_part.colour.colour_code;

        // console.log("base_colour:", base_colour);

        if (!colour_code) {
          const matchingBaseColour = Base_Colours.find(
            ({ name }) => name === base_colour
          );
          // console.log("matchingBaseColour:", matchingBaseColour);
          // @ts-ignore
          if (matchingBaseColour) {
            colour = matchingBaseColour.color;
          } else {
            console.warn(
              `Couldn't find color for color name "${name}" (in this client)`
            );
          }
        } else {
          colour = colour_code;
        }

        // console.log("colour:", colour);

        data.push({
          name,
          value: percent,
          colour,
        });
      });
    }
  }

  return data;
}

export { generateColourwayData };
