interface ConfirmDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
    return(
        <div className="overlay" onClick={onCancel}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <h2>Delete this Task?</h2>
                <p className="muted">This can't be undone!</p>

                <div className="dialog-actions">
                    <button type="button" className="btn danger-solid" onClick={onConfirm}>Delete</button>
                    <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}