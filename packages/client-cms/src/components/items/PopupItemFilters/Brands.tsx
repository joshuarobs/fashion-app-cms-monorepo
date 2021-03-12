/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Brands
 */
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Typography, Input } from 'antd';
import Fuse from 'fuse.js';

const { Text } = Typography;

const styles = {
  title: {
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    paddingTop: 4,
    paddingBottom: 4,
  },
};

// console.log(brandsByLetter);

const options = {
  keys: ['id', 'name'],
  threshold: 0.2,
};

interface BrandsProps {
  brands: any;
  values: any;
  setValues: Function;
}

function Brands({ brands, values, setValues }: BrandsProps) {
  // Filter by the search value
  const fuse = new Fuse(brands.companies, options);
  const filteredSearch = values.search ? fuse.search(values.search) : null;
  // console.log('filteredSearch:', filteredSearch);

  const visibleLetters: string[] = [];

  // Check to see if a letter group should be visible or not
  // i.e. if there is at least one element that's in the filter
  if (values.search) {
    Object.keys(brands.companiesByLetter).forEach((letter) => {
      const letterGroup = brands.companiesByLetter[letter];
      let foundVisible = false;
      for (let i = 0; i < letterGroup.length; i++) {
        const brand = letterGroup[i];
        // Check if there's an item in filteredSearch
        const visible =
          // @ts-ignore
          (filteredSearch && filteredSearch.find((x) => x.id === brand.id)) ||
          !filteredSearch;
        // break early if so
        if (visible) {
          foundVisible = true;
          break;
        }
      }
      if (foundVisible) {
        // Add to the list of letter groups we can show
        visibleLetters.push(letter);
      }
    });
  }

  // console.log(visibleLetters);

  return (
    <div>
      <Checkbox.Group
        style={{ width: '100%' }}
        value={values.brands}
        onChange={(checkedValues) =>
          setValues({
            ...values,
            brands: checkedValues,
          })
        }
      >
        <Input
          placeholder="Search in Brands"
          value={values.search}
          onChange={(e) =>
            setValues({
              ...values,
              search: e.target.value,
            })
          }
          style={{
            marginBottom: 12,
            width: '100%',
          }}
          suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        {Object.keys(brands.companiesByLetter).map((letter, index) => {
          const groupVisible =
            (filteredSearch && visibleLetters.find((x) => x === letter)) ||
            !filteredSearch;
          const display = groupVisible ? 'block' : 'none';
          return (
            <div key={letter}>
              <div
                style={
                  index > 0
                    ? {
                        ...styles.title,
                        display,
                      }
                    : {
                        ...styles.title,
                        display,
                        marginTop: 0,
                      }
                }
              >
                <Text type="secondary" strong>
                  {letter}
                </Text>
                <br />
              </div>
              {brands.companiesByLetter[letter].map((brand: any) => {
                const itemVisible =
                  groupVisible &&
                  ((filteredSearch &&
                    // @ts-ignore
                    filteredSearch.find((x) => x.id === brand.id)) ||
                    !filteredSearch);

                return (
                  <div
                    key={brand.id}
                    style={
                      itemVisible ? { display: 'block' } : { display: 'none' }
                    }
                  >
                    <Checkbox value={brand.id} style={styles.checkbox}>
                      {brand.name}
                    </Checkbox>
                    <br />
                  </div>
                );
              })}
            </div>
          );
        })}
      </Checkbox.Group>
    </div>
  );
}

export { Brands };
