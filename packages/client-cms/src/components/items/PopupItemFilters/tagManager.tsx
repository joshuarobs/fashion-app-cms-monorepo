import React from 'react';
import { Tag } from 'antd';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';
import { ItemFilterValuesOccasion } from '../../../framework/itemFilterValuesOccasion';
import { ItemFilterValuesStyle } from '../../../framework/itemFilterValuesStyle';
import { ItemFilterValuesNumber } from '../../../framework/itemFilterValuesNumber';

const cssStyles = {
  searchAndFilterButtons: {
    verticalAlign: 'middle',
    marginRight: 8,
    // marginTop: 4,
    // marginBottom: 4
  },
};

interface MenuStrings {
  gender: string[];
  category: string[];
  occasions: string[];
  styles: string[];
  brands: string[];
  numberOfSellersValues: string[];
  featuredSellers: string[];
  sellers: string[];
  price: string[];
  colours: string[];
  materials: string[];
  numberInClosets: string[];
  pickRate: string[];
  madeIn: string[];
}

interface GenerateTabsProps {
  gender: any;
  setGender: any;
  occasions: any;
  setOccasions: any;
  styles: any;
  setStyles: any;
  brands: any;
  setBrands: any;
  numberOfResellersValues: any;
  setNumberOfResellersValues: any;
  featuredResellers: any;
  setFeaturedResellers: any;
  resellers: any;
  setResellers: any;
  price: any;
  setPrice: any;
  testBrands: any;
  testSellers: any;
  originalStates: any;
}

function generateTabs({
  gender,
  setGender,
  occasions,
  setOccasions,
  styles,
  setStyles,
  brands,
  setBrands,
  numberOfResellersValues,
  setNumberOfResellersValues,
  featuredResellers,
  setFeaturedResellers,
  resellers,
  setResellers,
  price,
  setPrice,
  testBrands,
  testSellers,
  originalStates,
}: GenerateTabsProps) {
  console.log('originalStates:', originalStates);
  const menuStrings: MenuStrings = {
    gender: [],
    category: [],
    occasions: [],
    styles: [],
    brands: [],
    numberOfSellersValues: [],
    featuredSellers: [],
    sellers: [],
    price: [],
    colours: [],
    materials: [],
    numberInClosets: [],
    pickRate: [],
    madeIn: [],
  };
  // Handle tags stuff
  const tagsGender: JSX.Element[] = [];
  if (gender !== null && gender !== ItemFilterValuesGender.Values.All.id) {
    // @ts-ignore
    const string = ItemFilterValuesGender.Map.get(gender).name;
    tagsGender.push(
      <Tag
        style={cssStyles.searchAndFilterButtons}
        key="gender"
        className="large-tag"
        closable
        onClose={() => setGender(originalStates.gender)}
      >
        {string}
      </Tag>
    );
    if (string !== ItemFilterValuesGender.Values.All.name) {
      menuStrings.gender.push(string);
    }
  }
  // TODO: CATEGORY
  const tagsOccasions: JSX.Element[] = [];
  if (occasions.length > 0) {
    const sortedValues = occasions.sort();
    sortedValues.forEach((value: any) => {
      console.log();
      // @ts-ignore
      const string = ItemFilterValuesOccasion.Map.get(value).name;
      tagsOccasions.push(
        <Tag
          style={cssStyles.searchAndFilterButtons}
          key={value}
          className="large-tag"
          closable
          onClose={() =>
            setOccasions(
              occasions.filter((v: any) => {
                return v !== value;
              })
            )
          }
        >
          {string}
        </Tag>
      );
      menuStrings.occasions.push(string);
    });
  }

  const tagsStyles: JSX.Element[] = [];
  if (styles.length > 0) {
    const sortedValues = styles.sort();
    sortedValues.forEach((value: any) => {
      // @ts-ignore
      const string = ItemFilterValuesStyle.Map.get(value).name;
      tagsStyles.push(
        <Tag
          style={cssStyles.searchAndFilterButtons}
          key={value}
          className="large-tag"
          closable
          onClose={() =>
            setStyles(
              styles.filter((v: any) => {
                return v !== value;
              })
            )
          }
        >
          {string}
        </Tag>
      );
      menuStrings.styles.push(string);
    });
  }

  const tagsBrands: JSX.Element[] = [];
  if (brands.brands.length > 0) {
    const sortedValues = brands.brands.sort();
    sortedValues.forEach((value: any) => {
      const matches = testBrands.filter((brand: any) => {
        return brand.id === value;
      });
      const string = matches[0].name;
      tagsBrands.push(
        <Tag
          style={cssStyles.searchAndFilterButtons}
          key={value}
          className="large-tag"
          closable
          onClose={() =>
            setBrands({
              ...brands,
              brands: brands.brands.filter((v: any) => {
                return v !== value;
              }),
            })
          }
        >
          {string}
        </Tag>
      );
      menuStrings.brands.push(string);
    });
  }

  const tagsFeaturedSellers: JSX.Element[] = [];
  if (featuredResellers.companies.length > 0) {
    const sortedValues = featuredResellers.companies.sort();
    sortedValues.forEach((value: any) => {
      const matches = testSellers.filter((company: any) => {
        return company.id === value;
      });
      const string = matches[0].isReseller
        ? matches[0].website
        : matches[0].name;
      tagsFeaturedSellers.push(
        <Tag
          style={cssStyles.searchAndFilterButtons}
          key={value}
          className="large-tag"
          closable
          onClose={() =>
            setFeaturedResellers({
              ...featuredResellers,
              companies: featuredResellers.companies.filter((v: any) => {
                return v !== value;
              }),
            })
          }
        >
          Featured Seller: {string}
        </Tag>
      );
      menuStrings.featuredSellers.push(string);
    });
  }

  const tagsSellers: JSX.Element[] = [];
  if (resellers.companies.length > 0) {
    const sortedValues = resellers.companies.sort();
    sortedValues.forEach((value: any) => {
      const matches = testSellers.filter((company: any) => {
        return company.id === value;
      });
      const string = matches[0].isReseller
        ? matches[0].website
        : matches[0].name;
      tagsSellers.push(
        <Tag
          style={cssStyles.searchAndFilterButtons}
          key={value}
          className="large-tag"
          closable
          onClose={() =>
            setResellers({
              ...resellers,
              companies: resellers.companies.filter((v: any) => {
                return v !== value;
              }),
            })
          }
        >
          Seller: {string}
        </Tag>
      );
      menuStrings.sellers.push(string);
    });
  }

  const tagsNumberOfSellers = [];
  if (numberOfResellersValues !== null) {
    // Check if the value isn't null/undefined for the current type
    let string = undefined;
    // TODO: Copy these validation into the state as well
    switch (numberOfResellersValues.type) {
      case ItemFilterValuesNumber.Values.Equal_To.id:
        if (
          numberOfResellersValues.equalTo ||
          numberOfResellersValues.equalTo === 0
        ) {
          string = `Sellers: ${numberOfResellersValues.equalTo}`;
        }
        break;
      case ItemFilterValuesNumber.Values.Range.id:
        if (
          (numberOfResellersValues.rangeMin ||
            numberOfResellersValues.rangeMin === 0) &&
          numberOfResellersValues.rangeMax
        ) {
          string = `Sellers: ${numberOfResellersValues.rangeMin} to ${numberOfResellersValues.rangeMax}`;
        }
        break;
      case ItemFilterValuesNumber.Values.Greater_Than_Or_Equal_To.id:
        if (
          numberOfResellersValues.greaterThanOrEqualTo ||
          numberOfResellersValues.greaterThanOrEqualTo === 0
        ) {
          string = `Sellers: ${numberOfResellersValues.greaterThanOrEqualTo} or more`;
        }
        break;
      case ItemFilterValuesNumber.Values.Lesser_Than_Or_Equal_To.id:
        if (numberOfResellersValues.lesserThanOrEqualTo) {
          string = `Sellers: ${numberOfResellersValues.lesserThanOrEqualTo} or less`;
        }
        break;
    }
    if (string) {
      tagsNumberOfSellers.push(
        <Tag
          key="sellers"
          style={cssStyles.searchAndFilterButtons}
          className="large-tag"
          closable
          onClose={() => {
            switch (numberOfResellersValues.type) {
              case ItemFilterValuesNumber.Values.Equal_To.id:
                setNumberOfResellersValues({
                  ...numberOfResellersValues,
                  equalTo: originalStates.numberOfSellersValues.equalTo,
                });
                break;
              case ItemFilterValuesNumber.Values.Range.id:
                setNumberOfResellersValues({
                  ...numberOfResellersValues,
                  rangeMin: originalStates.numberOfSellersValues.rangeMin,
                  rangeMax: originalStates.numberOfSellersValues.rangeMax,
                });
                break;
              case ItemFilterValuesNumber.Values.Greater_Than_Or_Equal_To.id:
                setNumberOfResellersValues({
                  ...numberOfResellersValues,
                  greaterThanOrEqualTo:
                    originalStates.numberOfSellersValues.greaterThanOrEqualTo,
                });
                break;
              case ItemFilterValuesNumber.Values.Lesser_Than_Or_Equal_To.id:
                setNumberOfResellersValues({
                  ...numberOfResellersValues,
                  lesserThanOrEqualTo:
                    originalStates.numberOfSellersValues.lesserThanOrEqualTo,
                });
                break;
            }
          }}
        >
          {string}
        </Tag>
      );
      menuStrings.numberOfSellersValues.push(string);
    }
  }

  const tagsPrice = [];
  if (price !== null) {
    // Check if the value isn't null/undefined for the current type
    let string = undefined;
    // TODO: Copy these validation into the state as well
    switch (price.type) {
      case ItemFilterValuesNumber.Values.Equal_To.id:
        if (price.equalTo || price.equalTo === 0) {
          string = `$${price.equalTo.toLocaleString()}`;
        }
        break;
      case ItemFilterValuesNumber.Values.Range.id:
        if ((price.rangeMin || price.rangeMin === 0) && price.rangeMax) {
          string = `$${price.rangeMin.toLocaleString()} to $${price.rangeMax.toLocaleString()}`;
        }
        break;
      case ItemFilterValuesNumber.Values.Greater_Than_Or_Equal_To.id:
        if (price.greaterThanOrEqualTo || price.greaterThanOrEqualTo === 0) {
          string = `$${price.greaterThanOrEqualTo.toLocaleString()} or more`;
        }
        break;
      case ItemFilterValuesNumber.Values.Lesser_Than_Or_Equal_To.id:
        if (price.lesserThanOrEqualTo) {
          string = `$${price.lesserThanOrEqualTo.toLocaleString()} or less`;
        }
        break;
    }
    if (string) {
      tagsPrice.push(
        <Tag
          key="price"
          style={cssStyles.searchAndFilterButtons}
          className="large-tag"
          closable
          onClose={() => {
            switch (price.type) {
              // case ItemFilterValuesNumbers.VALUES.EQUAL_TO.id:
              //   setPrice({
              //     ...price,
              //     equalTo: originalStates.price.equalTo
              //   });
              //   break;
              case ItemFilterValuesNumber.Values.Range.id:
                setPrice({
                  ...price,
                  rangeMin: originalStates.price.rangeMin,
                  rangeMax: originalStates.price.rangeMax,
                });
                break;
              case ItemFilterValuesNumber.Values.Greater_Than_Or_Equal_To.id:
                setPrice({
                  ...price,
                  greaterThanOrEqualTo:
                    originalStates.price.greaterThanOrEqualTo,
                });
                break;
              case ItemFilterValuesNumber.Values.Lesser_Than_Or_Equal_To.id:
                setPrice({
                  ...price,
                  lesserThanOrEqualTo: originalStates.price.lesserThanOrEqualTo,
                });
                break;
            }
          }}
        >
          {string}
        </Tag>
      );
      menuStrings.price.push(string);
    }
  }
  // TODO: COLOURS
  // TODO: MATERIAL
  // TODO: NUMBER_IN_CLOSETS
  // TODO: PICK_RATE
  // TODO: MADE_IN

  return {
    tags: (
      <>
        {tagsGender}
        {tagsOccasions}
        {tagsStyles}
        {tagsBrands}
        {tagsNumberOfSellers}
        {tagsFeaturedSellers}
        {tagsSellers}
        {tagsPrice}
      </>
    ),
    menuStrings,
  };
}

export { generateTabs };
