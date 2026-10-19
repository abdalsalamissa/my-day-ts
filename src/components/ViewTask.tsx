import type { Task } from "../types";

interface ViewTaskProps {
    task: Task;
    onCancel: () => void;
}

export default function ViewTask({ task, onCancel }: ViewTaskProps) {
    return(
        <>
            <button type="button" className="back" onClick={onCancel}>
                <i className="fa-solid fa-angle-left"></i>All Tasks
            </button>

            <div className="card form">
                <h1>View Task</h1>
                <p className="muted">This is a read-only view of the task.</p>

                <label className="label">Task Name:</label>
                <p className="view-text">{task.title}</p>
                <br />
                <label className="label">Completed:</label>
                <p className="view-text">{task.completed ? "Yes" : "No"}</p>

                <div className="form-actions back">
                    <button type="button" className="btn view-back" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </> 
    );
}