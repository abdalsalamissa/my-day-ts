import { useState } from "react";
import type { SyntheticEvent, ChangeEvent } from "react";
import type { Task } from "../types"

const MIN: number = 4;
const MAX: number = 80;

function validate(value: string): string {
    const text = value.trim();
    if (text.length === 0) return `Task can't be empty. Enter at least ${MIN} characters.`;
    if (text.length < MIN) return `Task is too short. Use at least ${MIN} characters.`;
    if (text.length > MAX) return `Task is too long. Use ${MAX} characters or fewer.`;
    return "";
}

interface TaskFormProps {
    mode: "create" | "edit";
    task?: Task;
    onSubmit: (title: string, completed: boolean) => void;
    onCancel: () => void;
    onDelete?: () => void;
}

export default function TaskForm({ mode, task, onSubmit, onCancel, onDelete }: TaskFormProps) {
    const isEdit = mode === "edit";

    const [text, setText] = useState(task?.title ?? "");
    const [completed, setCompleted] = useState(task?.completed ?? false);
    const [error, setError] = useState("");

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const message = validate(text);
        if (message) {
            setError(message);
            return;
        }
        onSubmit(text.trim(), completed);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setError("");
    };

    return(
        <>
            <button type="button" className="back" onClick={onCancel}>
                <i className="fa-solid fa-angle-left"></i>All Tasks
            </button>

            <form className="card form" onSubmit={handleSubmit} noValidate>
                <h1>{isEdit ? "Edit Task" : "New Task"}</h1>
                <p className="muted">
                    {isEdit
                        ? "Change the wording or mark it complete. Cancel leaves the task untouched."
                        : "Add a task to your list. You can edit or delete it later."}
                </p>

                <label htmlFor="task-input" className="label">Task Name</label>
                <input
                    id="task-input"
                    className={`input ${error ? "has-error" : ""}`}
                    value={text}
                    placeholder="What needs doing?"
                    autoFocus
                    onChange={handleTitleChange}
                />

                <div className="hint-row">
                    <span className={error ? "error" : "muted small"}>
                        {error || `Between ${MIN} and ${MAX} characters.`}
                    </span>
                    <span className="muted small">{text.length} / {MAX}</span>
                </div>

                {isEdit && (
                    <label className="complete-box">
                        <input 
                            type="checkbox"
                            className="check"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        Mark this as completed
                    </label>
                )}

                <div className="form-actions">
                    <button type="submit" className="btn primary">Save Task</button>
                    <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                    {isEdit && onDelete && (
                        <button type="button" className="btn danger push" onClick={onDelete}>
                            Delete Task
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}