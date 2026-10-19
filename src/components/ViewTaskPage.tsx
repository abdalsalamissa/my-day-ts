import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../types";
import ViewTask from "./ViewTask";

interface ViewTaskPageProps {
    tasks: Task[];
}

export default function ViewTaskPage({ tasks }: ViewTaskPageProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const task= tasks.find((task) => task.id === Number(id));

    if (!task) return <p className="muted">Task Not Found</p>

    return <ViewTask task={task} onCancel={() => navigate("/home")} />
}