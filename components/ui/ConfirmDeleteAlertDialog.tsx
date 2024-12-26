// src/components/ConfirmDeleteAlertDialog.tsx

import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ConfirmDeleteAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmDeleteAlertDialog: React.FC<ConfirmDeleteAlertDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-semibold mb-2">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mb-6">{description}</AlertDialog.Description>
          <div className="flex justify-end space-x-2">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
          <AlertDialog.Cancel className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </AlertDialog.Cancel >
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDeleteAlertDialog;
