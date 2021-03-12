import React from 'react';
import { Divider, Select } from 'antd';
import { useQuery } from '@apollo/client';
import { Get_Countries } from '../../../../queries/countries/getCountries';
import { Country_Of_Manufacture_Orders } from './orders';

const { Option, OptGroup } = Select;

interface SelectCountryOfManufactureProps {
  disabled: boolean;
  made_in_id: number;
  setMadeInId: any;
}

/**
 * An input select that allows picking through a list of countries,
 * specifically for manufacturing. A list of countries that a clothing
 * item can be made in.
 * @param props
 * @constructor
 */
function SelectCountryOfManufacture({
  disabled,
  made_in_id,
  setMadeInId,
}: SelectCountryOfManufactureProps) {
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

  const { countries } = data;
  // console.log("countries:", countries);

  // Sort the countries so they appear in order
  const countriesWithOrder: any[] = [];
  countries.forEach((country: any[]) => {
    // @ts-ignore
    const { value } = country;
    // console.log("translation 2:", translation);

    // Add a custom order for locales to sort them later in the sidebar
    const order = Country_Of_Manufacture_Orders[value]
      ? Country_Of_Manufacture_Orders[value]
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

  // Get the top 10
  const top10 = sortedCountries.slice(0, 9);
  // Get the main markets
  const mainMarkets = sortedCountries.slice(10, 16);
  // Get everything else
  const restOfMarkets = sortedCountries.slice(17, sortedCountries.length - 1);

  // console.log("sortedCountries:", sortedCountries);

  return (
    <Select
      value={made_in_id}
      onChange={(value) => setMadeInId(value)}
      showSearch
      style={{ width: '100%' }}
      disabled={disabled}
    >
      <OptGroup label="Top 10 Manufacturers">
        {top10.map(({ value, description }) => {
          return (
            <Option value={value} key={value}>
              {description}
            </Option>
          );
        })}
      </OptGroup>
      <OptGroup label="Main Markets">
        {mainMarkets.map(({ value, description }) => {
          return (
            <Option value={value} key={value}>
              {description}
            </Option>
          );
        })}
      </OptGroup>
      <OptGroup label="Others">
        {restOfMarkets.map(({ value, description }) => {
          return (
            <Option value={value} key={value}>
              {description}
            </Option>
          );
        })}
      </OptGroup>
    </Select>
  );
}

export { SelectCountryOfManufacture };
