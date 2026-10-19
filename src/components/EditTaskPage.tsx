import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../types";
import TaskForm from "./TaskForm";

interface EditTaskPageProps {
    tasks: Task[];
    onUpdate: (id: number, title: string, completed: boolean) => void;
    onRequestDelete: (id: number) => void;
}

export default function EditTaskPage({ tasks, onUpdate, onRequestDelete }: EditTaskPageProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const task = tasks.find((task) => task.id === Number(id));

    if (!task) return <p className="muted">Task Not Found</p>;

    return(
        <TaskForm
            key={task.id}
            mode="edit"
            task={task}
            onSubmit={(title, completed) => onUpdate(task.id, title, completed)}
            onCancel={() => navigate("/home")}
            onDelete={() => onRequestDelete(task.id)}
        />
    );
}