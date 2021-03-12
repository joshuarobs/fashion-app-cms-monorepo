/**
 * Figma reference:
 * Components/Filters Popup/Tab-Content/Featured Reseller
 */
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Typography, Input, Radio } from 'antd';
import Fuse from 'fuse.js';
import { ItemFilterValuesCompanyType } from '../../../framework/itemFilterValuesCompanyType';

const { Text } = Typography;
const Company_Types = ItemFilterValuesCompanyType.Values;

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

/**
 * The key for the special group 'Other' that dumps all odd names together
 * @type {string}
 */
const keyOther = 'Other';

// console.log(brandsByLetter);

const options = {
  keys: ['id', 'name', 'website'],
  threshold: 0.2,
};

interface FeaturedResellersProps {
  sellers: any;
  values: any;
  setValues: Function;
}

function FeaturedResellers({
  sellers,
  values,
  setValues,
}: FeaturedResellersProps) {
  // Filter by type
  let filterRes = sellers.companies;
  if (values.searchType === Company_Types.Sellers.id) {
    // console.log('SELLERS.companies:', sellers.companies);
    filterRes = sellers.companies.filter((obj: any) => {
      return obj.isReseller === true;
    });
    // console.log('filterRes:', filterRes);
  } else if (values.searchType === Company_Types.Designers.id) {
    filterRes = sellers.companies.filter((obj: any) => {
      return !obj.isReseller;
    });
  }

  // console.log('filterRes:', filterRes);

  // Filter by the search value
  const fuse = new Fuse(filterRes, options);
  const filteredSearch = values.search ? fuse.search(values.search) : filterRes;
  // console.log('filteredSearch:', filteredSearch);

  const visibleLetters: string[] = [];

  // Check to see if a letter group should be visible or not
  // i.e. if there is at least one element that's in the filter
  if (
    values.search ||
    values.searchType === Company_Types.Sellers.id ||
    values.searchType === Company_Types.Designers.id
  ) {
    Object.keys(sellers.companiesByLetter).forEach((letter) => {
      const letterGroup = sellers.companiesByLetter[letter];
      let foundVisible = false;
      for (let i = 0; i < letterGroup.length; i++) {
        const brand = letterGroup[i];
        // Check if there's an item in filteredSearch
        const visible = filteredSearch.find((x: any) => x.id === brand.id);
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

  // console.log('visibleLetters:', visibleLetters);

  return (
    <div>
      <Checkbox.Group
        style={{ width: '100%' }}
        value={values.companies}
        onChange={(checkedValues) =>
          setValues({
            ...values,
            companies: checkedValues,
          })
        }
      >
        <Input
          placeholder="Search in Featured Sellers"
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
        <div
          style={{
            width: '100%',
          }}
        >
          <Radio.Group
            onChange={(e) =>
              setValues({
                ...values,
                searchType: e.target.value,
              })
            }
            value={values.searchType}
            style={{
              marginBottom: 12,
            }}
          >
            <Radio value={Company_Types.All.id}>{Company_Types.All.name}</Radio>
            <Radio value={Company_Types.Sellers.id}>
              {Company_Types.Sellers.name}
            </Radio>
            <Radio value={Company_Types.Designers.id}>
              {Company_Types.Designers.name}
            </Radio>
          </Radio.Group>
        </div>
        {Object.keys(sellers.companiesByLetter).map((letter, index) => {
          const groupVisible =
            // First part is a fast shortcut to skip calculation
            // There is no search text filter
            (!values.search &&
              // And the type is ALL
              values.searchType === Company_Types.All.id) ||
            // Or, see if the letter group is meant to be visible
            (filteredSearch && visibleLetters.find((x) => x === letter));
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
              {sellers.companiesByLetter[letter].map((company: any) => {
                const itemVisible =
                  // Group is visible
                  groupVisible &&
                  // And the item is of the current display type
                  (values.searchType === Company_Types.All.id ||
                    (values.searchType === Company_Types.Designers.id &&
                      !company.isReseller) ||
                    (values.searchType === Company_Types.Sellers.id &&
                      company.isReseller === true)) &&
                  // And the item is found in the typed search filter
                  ((filteredSearch &&
                    filteredSearch.find((x: any) => x.id === company.id)) ||
                    !filteredSearch);

                return (
                  <div
                    key={company.id}
                    style={
                      itemVisible ? { display: 'block' } : { display: 'none' }
                    }
                  >
                    <Checkbox value={company.id} style={styles.checkbox}>
                      {company.isReseller ? company.website : company.name}
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

export { FeaturedResellers };
