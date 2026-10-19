import { useState, useEffect, useCallback } from "react";
import type { Task } from "./types.ts";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import TaskListPage from "./components/TaskListPage.tsx";
import TaskForm from "./components/TaskForm.tsx";
import EditTaskPage from "./components/EditTaskPage.tsx";
import ViewTaskPage from "./components/ViewTaskPage.tsx";
import ConfirmDialog from "./components/ConfirmDialog.tsx";
import Toast from "./components/Toast.tsx";
import { getTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "./api.ts";

// const initialTasks: Task[] = [
//   {id: 1, title: "Review the pull request from Team", completed: true},
//   {id: 2, title: "Write the sprint summary for Thursday", completed: false},
//   {id: 3, title: "Call the clinic about the invoice", completed: false},
//   {id: 4, title: "Book the meeting room for the demo", completed: true},
//   {id: 5, title: "Send the updated quote to the client", completed: false},
//   {id: 6, title: "Pay the domain renewal", completed: true},
//   {id: 7, title: "Prepare the onboarding checklist", completed: false},
// ];

interface ToastState {
  id: number;
  message: string;
}

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const navigate = useNavigate();

  const showToast = (message: string) => setToast({ id: Date.now(), message});
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
          console.error("Failed to load tasks:", err);
          setLoadError("Could not load tasks, Is the backend running.");
      } finally {
        setLoading(false);
      }
    }
    
    loadTasks();

  }, []);

  // toggle task
  const toggleTask = async (id:number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const saved = await apiUpdateTask(id, task.title, !task.completed);
      setTasks((previous) => previous.map((task) => (task.id === id ? saved : task)));
      showToast("Task Toggled!");
    } catch (err) {
        console.error("Failed to toggle task:", err);
        showToast("Something went wrong, Try again.");
    }
  };

  // create task
  const createTask = async (title: string) => {
    try {
      const created = await apiCreateTask(title);
      setTasks((previous) => [...previous, created]);
      showToast("Task Created!");
      navigate("/home");
    } catch (err) {
        console.error("Failed to create task:", err);
        showToast("Something went wrong, Try again.");
    }
  };

  // update task
  const updateTask = async (id: number, title: string, completed: boolean) => {
    try {
      const saved = await apiUpdateTask(id, title, completed);
      setTasks((previous) => previous.map((task) => (task.id === id ? saved : task)));
      showToast("Task Updated!");
      navigate("/home");
    } catch (err) {
        console.error("Failed to update task:", err);
        showToast("Something went wrong, Try again.");
    }
  };

  // delete task
  const confirmDelete = async () => {
    if (deletingId === null) return;

    try {
      await apiDeleteTask(deletingId);
      setTasks((previous) => previous.filter((task) => task.id !== deletingId));
      setDeletingId(null);
      showToast("Task Deleted!");
      navigate("/home");
    } catch (err) {
        console.error("Failed to delete task:", err);
        setDeletingId(null);
        showToast("Something went wrong, Try again.");
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  if (loading) return <p className="muted">Loading Tasks...</p>
  if (loadError) return <p className="error">{loadError}</p>

  const viewTask = (id: number) => navigate(`/view/${id}`);
  const editTask = (id: number) => navigate(`/edit/${id}`);

  return (
    <div className="layout">
      
      {/* Sidebar */}
      <Sidebar totalCount={tasks.length} completedCount={completedCount} />

      <main className="main">
        <Routes>
          {/* first page navigate */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* home page */}
          <Route
            path="/home"
            element={
              <TaskListPage
                title= "Home Page"
                description={`${activeCount} active · ${completedCount} completed`}
                tasks={tasks}
                onToggle={toggleTask}
                onView={viewTask}
                onEdit={editTask}
                onDelete={setDeletingId}
              />
            }
          />

          {/* completed page */}
          <Route
            path="/completed"
            element={
              <TaskListPage
                title= "Completed Tasks"
                description={`${completedCount} completed`}
                tasks={tasks.filter((task) => task.completed)}
                onToggle={toggleTask}
                onView={viewTask}
                onEdit={editTask}
                onDelete={setDeletingId}
              />
            }
          />

          {/* create task */}
          <Route
            path="/create"
            element={<TaskForm mode="create" onSubmit={createTask} onCancel={() => navigate("/home")} />}
          />

            {/* update task */}
          <Route 
            path="/edit/:id"
            element={<EditTaskPage tasks={tasks} onUpdate={updateTask} onRequestDelete={setDeletingId} />}
          />

          {/* view task */}
          <Route
            path="/view/:id"
            element={<ViewTaskPage tasks={tasks} />}
          />

          {/* path does not exist */}
          <Route path="*" element={<p className="muted">Page Not Found</p>} />
        </Routes>
      </main>

      {/* confirm delete */}
      {deletingId !== null && (
        <ConfirmDialog onConfirm={confirmDelete} onCancel={() => setDeletingId(null)} />
      )}

      {/* toast message */}
      {toast && <Toast key={toast.id} message={toast.message} onClose={closeToast} />}
    </div>
  );
}