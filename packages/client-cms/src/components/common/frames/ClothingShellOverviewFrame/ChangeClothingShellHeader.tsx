import React from 'react';
import { Alert, Button, Col, Divider, Row, Tooltip, Typography } from 'antd';
import { ClusterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../routes';
import { clothing_shells } from '../../../../utils/gql-interfaces/clothing_shells';
import { Common } from '../../../../strings';
import { RedWarningFilledIcon } from '../../icons/RedWarningFilledIcon';
import { VersionablePageErrors } from '../../../../utils/quick-error-gen/VersionablePageErrors';

const { Text } = Typography;

const size = 'small';

interface ChangeClothingShellHeaderProps {
  currentClothingShellId?: number | null;
  originalClothingShellId?: number | null;
  numberItemsText: string;
  clothingShell: clothing_shells;
  showPopup: Function;
  removeClothingShell: Function;
  clothingShellOverviewError?: VersionablePageErrors;
  disabled?: boolean;
}

function ChangeClothingShellHeader({
  originalClothingShellId,
  currentClothingShellId,
  numberItemsText,
  clothingShell,
  showPopup,
  removeClothingShell = () => {},
  clothingShellOverviewError,
  disabled,
}: ChangeClothingShellHeaderProps) {
  console.log('!!clothingShell:', clothingShell);
  let latestRevisionId = 1;
  let name;
  const { clothing_shell_maindata_revisions } = clothingShell;
  if (clothing_shell_maindata_revisions[0]) {
    latestRevisionId = clothing_shell_maindata_revisions[0].revision;
  }
  if (
    clothing_shell_maindata_revisions[0] &&
    clothing_shell_maindata_revisions[0].clothing_shell_maindata[0]
  ) {
    name = clothing_shell_maindata_revisions[0].clothing_shell_maindata[0].name;
  }

  // Calculate any errors and whether to show an error icon or not
  const errors = [];
  // if (!mainData) {
  //   errors.push('\nNo Maindata for revision');
  // } else {
  //   if (!name) {
  //     errors.push('\nNo name');
  //   }
  //   if (!clothing_shell_id) {
  //     errors.push('\nNo Clothing Shell');
  //   }
  // }
  if (!name) {
    errors.push('\nNo name');
  }

  const hasClothingShellError =
    typeof clothingShellOverviewError !== 'undefined';
  console.log('hasClothingShellError:', clothingShellOverviewError);

  let warningMessage;
  if (
    clothingShellOverviewError === VersionablePageErrors.No_Maindata_Revision
  ) {
    warningMessage = (
      <div>
        This clothing shell has no{' '}
        <code>clothing_shell_maindata_revisions</code>
      </div>
    );
  } else if (clothingShellOverviewError === VersionablePageErrors.No_Maindata) {
    warningMessage = (
      <div>
        This clothing shell has no <code>clothing_shell_maindata</code>
      </div>
    );
  }

  return (
    <>
      {hasClothingShellError && (
        <Row style={{ paddingBottom: 4 }}>
          <Alert
            message="Warning"
            description={warningMessage}
            type="warning"
            showIcon
            style={{ width: '100%', whiteSpace: 'break-spaces' }}
          />
        </Row>
      )}
      <Row style={{ paddingBottom: 4 }}>
        <Col>
          {originalClothingShellId !== currentClothingShellId ? (
            <Text strong mark>
              Clothing Shell - {numberItemsText}**
            </Text>
          ) : (
            <Text strong type="secondary">
              Clothing Shell - {numberItemsText}
            </Text>
          )}
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={18}>
          <Tooltip title="Clothing Shell">
            <ClusterOutlined
              style={{ marginRight: 8, fontSize: 18, verticalAlign: 'middle' }}
            />
          </Tooltip>
          <Link
            to={
              Routes.Clothing_Shells__Clothing_Shell +
              '/' +
              clothingShell.id +
              '?rev=' +
              latestRevisionId
            }
            style={{
              display: 'inline-block',
              width: '100%',
              paddingBottom: 2,
            }}
          >
            {name ? (
              <span style={{ verticalAlign: 'middle' }}>{name}</span>
            ) : (
              <span style={{ verticalAlign: 'middle' }}>
                {/*<RedWarningFilledIcon*/}
                {/*  errors={errors}*/}
                {/*  style={{*/}
                {/*    fontSize: 16,*/}
                {/*  }}*/}
                {/*/>*/}
                <Text type="danger">{Common.No_Set_Name}</Text>
              </span>
            )}
          </Link>
        </Col>
        <Col
          span={6}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {!hasClothingShellError && (
            <Button
              size={size}
              // @ts-ignore
              onClick={showPopup}
              disabled={disabled}
            >
              Change
            </Button>
          )}
          {hasClothingShellError && (
            <Button
              size={size}
              // @ts-ignore
              onClick={removeClothingShell}
              disabled={disabled}
              danger
            >
              Remove
            </Button>
          )}
        </Col>
      </Row>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
    </>
  );
}

export { ChangeClothingShellHeader };
