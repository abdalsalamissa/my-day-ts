import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onView, onEdit, onDelete }: TaskListProps) {
    return(
        <section className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </section>
    );
}