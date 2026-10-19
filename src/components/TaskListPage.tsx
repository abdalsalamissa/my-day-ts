import type { Task } from "../types";
import PageHeader from "./PageHeader";
import TaskList from "./TaskList";

interface TaskListPageProps {
    title: string;
    description: string;
    tasks: Task[];
    onToggle: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskListPage({ title, description, tasks, onToggle, onView, onEdit, onDelete }: TaskListPageProps) {
    return(
        <>
            <PageHeader title={title} description={description} />
            <TaskList tasks={tasks} onToggle={onToggle} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}