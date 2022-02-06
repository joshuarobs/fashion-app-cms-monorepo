import React from 'react';

interface NewEntryModalProps {
  itemName: string;
  nameFieldPlaceholder?: string;
  title: string;
  showModal: boolean;
  onCancel: (e: React.MouseEvent) => void;
  onSubmit: (e: React.MouseEvent) => void;
  inputRef: any;
  name: string | null;
  setName: Function;
  itemType: string;
  setItemType: Function;
  loading?: boolean;
  showTestingPurposeWarning?: boolean;
}

export type { NewEntryModalProps };
