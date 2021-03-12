import React from 'react';

const styles = {
  ratingTitle: {
    marginTop: 4,
  },
  rating: {
    fontSize: '1.2em',
    marginBottom: 4,
  },
};

interface MiniStatisticProps {
  title: any;
  value: any;
}

function MiniStatistic({ title, value }: MiniStatisticProps) {
  return (
    <>
      <div style={styles.ratingTitle}>
        <span>{title}</span>
        <br />
      </div>
      <div style={styles.rating}>
        <strong>{value ? value : '--'}</strong>
        <br />
      </div>
    </>
  );
}

export { MiniStatistic };
