import { QuickErrorSetMessagesItemsPage } from './QuickErrorSetMessagesItemsPage';

function getNumberOfQuickErrorsInSet(set: QuickErrorSetMessagesItemsPage) {
  let count = 0;
  for (const setGroup of Object.values(set)) {
    count += setGroup.length;
  }
  return count;
}

export { getNumberOfQuickErrorsInSet };
