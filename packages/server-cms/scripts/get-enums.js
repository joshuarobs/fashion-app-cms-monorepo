const fs = require('fs');
const { join } = require('path');
const { importSchema } = require('graphql-import');
const prettier = require('prettier');

console.log('--------------------------------------------------');
console.log('get-enum');
console.log('--------------------------------------------------');

// Automatically calls prettier to format the code nicely without having to
// do it manually yourself everytime

// Note: `schema.graphql` isn't committed in the repo, so copy and paste it
// from the `fashion-app-database-items` repo, or run the script to generate
// it in the right place. Also that file should be in the `server-cms/` folder.

const schemaTypeDefs = importSchema(join(__dirname, '../schema.graphql'));

const stringByLines = schemaTypeDefs.split('\n');

let buffer = '';

for (let i = 0; i < 1000; i++) {
  buffer += schemaTypeDefs[i];
}

const pureValueTypeEnums = [];
const selectionKeysTableEnums = [];
let i = 0;

stringByLines.forEach((stringByLine) => {
  // --------------------------------------------------
  // CASE: Get `pure value type enums`
  // --------------------------------------------------
  const isPureValueTypeEnum = stringByLine.includes('_enum {');
  // --------------------------------------------------
  // CASE: Get `selection keys table enums`
  // --------------------------------------------------
  const isSelectionKeysTableEnum = stringByLine.includes('_select_column {');

  if (isPureValueTypeEnum || isSelectionKeysTableEnum) {
    let array = pureValueTypeEnums;
    if (isSelectionKeysTableEnum) array = selectionKeysTableEnums;

    // normalEnums.push(stringByLine);
    // If we got a match, then get all of the lines of the type
    for (let ii = i; ii < stringByLines.length; ii++) {
      const str = stringByLines[ii];
      if (str !== '}') {
        array.push(str);
      } else {
        array.push('}', '');
        break;
      }
    }
  }

  i++;
});

// const t = stringByLines[0].contains('aa');
// console.log('test:', stringByLines[0]);

// console.log('pureValueTypeEnums:', pureValueTypeEnums);
// console.log('selectionKeysTableEnums:', selectionKeysTableEnums);

const allArrays = pureValueTypeEnums.concat(selectionKeysTableEnums).join('\n');

const filePrefix = `import { gql } from '@apollo/client';

const typeDefsEnums = gql\`
`;

const fileSuffix = `
\`;

export { typeDefsEnums };

`;

const finalString = prettier.format(filePrefix + allArrays + fileSuffix, {
  singleQuote: true,
  parser: 'babel',
});

// console.log('finalString:', finalString);

// console.log('filePrefix:', filePrefix);
// console.log('fileSuffix:', fileSuffix);

// console.log('schemaTypeDefs:\n', stringByLines);
// console.log('string:', string);
console.log('Writing file at: server-cms/src/typeDefsEnums.ts');
fs.writeFileSync(join(__dirname, '../src/typeDefsEnums.ts'), finalString);

console.log('DONE!');
