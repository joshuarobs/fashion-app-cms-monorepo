import React from 'react';
import { Badge } from 'antd';

function HeaderTabLinkCountBadge({ count = 0, adjustY = 0 }) {
  return (
    <Badge
      count={count.toLocaleString()}
      overflowCount={10000}
      className="site-badge-count-4"
      style={{
        top: adjustY,
      }}
    />
  );
}

export { HeaderTabLinkCountBadge };
