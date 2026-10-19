import type { Task } from "../types.ts"

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onView, onEdit, onDelete }: TaskItemProps) {
    return(
        <div className="task">
            <input 
                type="checkbox" 
                className="check" 
                checked={task.completed} 
                onChange={() => onToggle(task.id)} 
            />
            <span 
                className={`task-text ${task.completed ? "is-done" : ""}`} >
                    {task.title}
            </span>

            <div className="task-actions">
                <button type="button" className="icon-btn view" onClick={() => onView(task.id)} aria-label="View Task">
                    <i className="fa-solid fa-eye"></i>
                </button>
                <button type="button" className="icon-btn edit" onClick={() => onEdit(task.id)} aria-label="Edit Task">
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button type="button" className="icon-btn delete" onClick={() => onDelete(task.id)} aria-label="Delete Task">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    );
}