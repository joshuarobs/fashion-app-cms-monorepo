import React from 'react';
import { HeaderFrame } from '../components/media-list/HeaderFrame/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { pageStyles } from './pageStyles';
import { MediaItemsTableView } from '../components/common/table-views/MediaItemsTableView';

function MediaListPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <MediaItemsTableView />
      </div>
      <Footer />
    </>
  );
}

export { MediaListPage };
