const fs = require('fs');
const { join } = require('path');
const { importSchema } = require('graphql-import');
const prettier = require('prettier');
const dayjs = require('dayjs');

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

const pureValueTypeEnums = [
  '#============================================================',
  '# Pure Value Type Enums',
  '#============================================================',
];
const selectionKeysTableEnums = [
  '#============================================================',
  '# Selection Keys Table Enums',
  '#============================================================',
];
const tableSelectionKeys = [
  '#============================================================',
  '# Table Selection Keys',
  '#============================================================',
];
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
  // --------------------------------------------------
  // CASE: Get `table selection keys`
  // --------------------------------------------------
  const isTableSelectionKeys = stringByLine.includes('_set_input {');

  if (isPureValueTypeEnum || isSelectionKeysTableEnum || isTableSelectionKeys) {
    let array = pureValueTypeEnums;
    if (isSelectionKeysTableEnum) {
      array = selectionKeysTableEnums;
    } else if (isTableSelectionKeys) {
      array = tableSelectionKeys;
    }

    // normalEnums.push(stringByLine);
    // If we got a match, then get all of the lines of the type
    for (let ii = i; ii < stringByLines.length; ii++) {
      let str = stringByLines[ii];
      if (isTableSelectionKeys) {
        if (str.includes(': numeric')) {
          str = str.replace(': numeric', ': Float');
        } else if (str.includes(': smallint')) {
          str = str.replace(': smallint', ': Int');
        } else if (str.includes(': uuid')) {
          str = str.replace(': uuid', ': String');
        } else if (str.includes(': timestamptz')) {
          str = str.replace(': timestamptz', ': String');
        }
      }

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

const allArrays = pureValueTypeEnums
  .concat(selectionKeysTableEnums, tableSelectionKeys)
  .join('\n');

const date = dayjs();

const filePrefix = `import { gql } from '@apollo/client';

// Generated on: ${date}

/* ============================================================
 * !!IMPORTANT!!
 *
 * This file should not be edited manually at all.
 *
 * If you need to update the enums, run the script:
 * \`server-cms/scripts/get-enums.js\`
 *
 * Ensure you have a \`server-cms/schema.graphql\` file before
 * doing so.
 *
 * All enums in this file are scraped from the schema file
 * via the script.
 * ============================================================
 */

/* ============================================================
 * !!IMPORTANT!!
 *
 * This file should not be edited manually at all.
 *
 * If you need to update the enums, run the script:
 * \`server-cms/scripts/get-enums.js\`
 *
 * Ensure you have a \`server-cms/schema.graphql\` file before
 * doing so.
 * 
 * All enums in this file are scraped from the schema file
 * via the script.
 * ============================================================
 */

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
