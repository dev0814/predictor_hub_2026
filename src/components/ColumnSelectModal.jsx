import React from 'react';
import ColumnSelector from './ColumnSelector';
import './ColumnSelectModal.css';

const ColumnSelectModal = ({
  open,
  title = 'Select Columns',
  columns,
  selectedKeys,
  onChange,
  onCancel,
  onConfirm,
  confirmLabel = 'Generate PDF',
}) => {
  if (!open) return null;

  const confirmDisabled = !selectedKeys || selectedKeys.length === 0;

  return (
    <div className="column-modal-overlay" role="dialog" aria-modal="true">
      <div className="column-modal">
        <div className="column-modal-header">
          <h3>{title}</h3>
        </div>

        <div className="column-modal-body">
          <ColumnSelector
            columns={columns}
            selectedKeys={selectedKeys}
            onChange={onChange}
            title="Available Columns"
          />
          {confirmDisabled && (
            <div className="column-modal-hint">Select at least one column.</div>
          )}
        </div>

        <div className="column-modal-footer">
          <button type="button" className="column-modal-btn secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="column-modal-btn primary"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectModal;
