import React from 'react';
import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { Get_Countries } from '../../../../queries/countries/getCountries';
import { Country_Of_Brand_Origin_Order } from './orders';

const { Option, OptGroup } = Select;

interface SelectCountryOfBrandOriginProps {
  disabled?: boolean;
  founded_in_id: string | null;
  setFoundedInId: any;
}

/**
 * An input select that allows picking through a list of countries,
 * specifically for manufacturing. A list of countries that a clothing
 * item can be made in.
 * @param props
 * @constructor
 */
function SelectCountryOfBrandOrigin({
  disabled = false,
  founded_in_id,
  setFoundedInId,
}: SelectCountryOfBrandOriginProps) {
  const { loading, error, data } = useQuery(Get_Countries);
  if (error) return <div>Error: ${error}</div>;
  if (loading) {
    return (
      <Select
        defaultValue="1"
        showSearch
        style={{ width: '100%' }}
        disabled={disabled}
      >
        <Option value="1">null</Option>
      </Select>
    );
  }

  const { getCountries } = data;
  // console.log("countries:", countries);

  // Sort the countries so they appear in order
  const countriesWithOrder: any[] = [];
  getCountries.forEach((country: any) => {
    const { value } = country;
    // console.log("translation 2:", translation);

    // Add a custom order for locales to sort them later in the sidebar
    const order = Country_Of_Brand_Origin_Order[value]
      ? Country_Of_Brand_Origin_Order[value]
      : 99999999;

    countriesWithOrder.push({
      ...country,
      order,
    });
  });

  // Sort the locales by their order
  const sortedCountries = countriesWithOrder.sort((a, b) =>
    a.order > b.order ? 1 : -1
  );

  const Num_Main = 13;
  const Num_Europe = 7;
  const Num_Asia = 11;
  const Num_Americas = 1;
  const Num_Middle_East = 1;
  const Num_Africa = 1;

  const Main_Min = 0;
  const Main_Max = Num_Main;
  const Europe_Min = Main_Max;
  const Europe_Max = Europe_Min + Num_Europe;
  const Asia_Min = Europe_Max;
  const Asia_Max = Asia_Min + Num_Asia;
  const Americas_Min = Asia_Max;
  const Americas_Max = Americas_Min + Num_Americas;
  const Middle_East_Min = Americas_Max;
  const Middle_East_Max = Middle_East_Min + Num_Middle_East;
  const Africa_Min = Middle_East_Max;
  const Africa_Max = Africa_Min + Num_Africa;

  // Get the top 10
  const mainMarkets = sortedCountries.slice(Main_Min, Main_Max);
  // Europe
  const europe = sortedCountries.slice(Europe_Min, Europe_Max);
  // Asia
  const asia = sortedCountries.slice(Asia_Min, Asia_Max);
  // Americas
  const americas = sortedCountries.slice(Americas_Min, Americas_Max);
  // Middle east
  const middleEast = sortedCountries.slice(Middle_East_Min, Middle_East_Max);
  // Africa
  const africa = sortedCountries.slice(Africa_Min, Africa_Max);

  // Get everything else
  // const restOfMarkets = sortedCountries.slice(17, sortedCountries.length - 1);

  // console.log("sortedCountries:", sortedCountries);

  return (
    <Select
      // @ts-ignore
      value={founded_in_id}
      onChange={(value) => setFoundedInId(value)}
      showSearch
      style={{ width: '100%' }}
      disabled={disabled}
    >
      {/* @ts-ignore */}
      <Option value={null}></Option>
      <OptGroup label="Main Markets">
        {mainMarkets.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
      <OptGroup label="Europe">
        {europe.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
      <OptGroup label="Asia">
        {asia.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
      <OptGroup label="Americas">
        {americas.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
      <OptGroup label="Middle East">
        {middleEast.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
      <OptGroup label="Africa">
        {africa.map(({ value, description }) => {
          return <Option value={value}>{description}</Option>;
        })}
      </OptGroup>
    </Select>
  );
}

export { SelectCountryOfBrandOrigin };
