import { Trash2, Loader2 } from 'lucide-react';

const DeleteModal = ({ deleteTarget, deleting, onConfirm, onCancel }) => {
  if (!deleteTarget) return null;

  return (
    <div className="modal-overlay" onClick={() => !deleting && onCancel()}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon">
          <Trash2 size={28} />
        </div>
        <h3 className="delete-modal-title">Delete Menu Item?</h3>
        <p className="delete-modal-desc">
          You are about to permanently delete
          <span className="delete-modal-name"> "{deleteTarget.title}"</span> from your menu.
          This action <strong>cannot be undone</strong>.
        </p>
        <div className="delete-modal-actions">
          <button className="btn-outline" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm} disabled={deleting}>
            {deleting
              ? <><Loader2 size={16} className="spin" /> Deleting...</>
              : <><Trash2 size={16} /> Yes, Delete</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
