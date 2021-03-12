import React from 'react';
import { Button, Row, Typography, Alert } from 'antd';
import { Transition } from 'react-transition-group';

// const { Text } = Typography;

const duration = 175;

const defaultStyle = {
  transform: 'translateY(144px)',
  transition: `transform ${duration}ms ease-out`,
  // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
};

const transitionStyles = {
  entering: { transform: 'translateY(144px)' },
  entered: { opacity: 1, transform: 'translateY(-32px)' },
  exiting: { opacity: 0, transform: 'translateY(-32px)' },
  exited: { opacity: 0, transform: 'translateY(144px)' },
};

interface UnsavedChangesCardProps {
  numberOfChanges: number;
  discardChanges: Function;
  saveChanges: Function;
}

function UnsavedChangesCard({
  numberOfChanges = 0,
  discardChanges,
  saveChanges,
}: UnsavedChangesCardProps) {
  const message = `You have ${numberOfChanges} unsaved changes`;

  return (
    <div
      style={{
        position: 'fixed',
        // @ts-ignore
        zIndex: '800',
        bottom: 0,
        left: 'calc((50vw - 142px))',
        pointerEvents: numberOfChanges > 0 ? 'inherit' : 'none',
        // left: "calc(200px + (50vw - 253px))"
      }}
    >
      <Transition in={numberOfChanges > 0} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              // @ts-ignore
              ...transitionStyles[state],
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 5,
                border: '#ccc solid 1px',
                boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.35)',
                overflow: 'hidden',
              }}
            >
              <Row>
                <Alert message={message} type="warning" showIcon />
              </Row>
              <Row style={{ marginTop: 8 }}>
                <Button
                  size="small"
                  // @ts-ignore
                  onClick={discardChanges}
                  disabled={numberOfChanges === 0}
                >
                  Discard Changes
                </Button>
                <Button
                  size="small"
                  // @ts-ignore
                  onClick={saveChanges}
                  type="primary"
                  style={{ marginLeft: 8 }}
                >
                  Save Changes
                </Button>
              </Row>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export { UnsavedChangesCard };
