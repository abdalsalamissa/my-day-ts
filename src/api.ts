import type { Task } from "./types";

const API_URL = "http://localhost:5217/api";

async function request<T>(path:string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: options.body ? { "Content-Type" : "application/json" } : undefined,
    });

    if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
    }

    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>
}

// fetch api for get tasks
export function getTasks(): Promise<Task[]> {
    return request<Task[]>("/tasks");
} 

// fetch api for create task
export function createTask(title: string): Promise<Task> {
    return request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
    });
}

// fetch api for update task
export function updateTask(id: number, title: string, completed: boolean): Promise<Task> {
    return request<Task>(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, completed }),
    });
}

// fetch api for delete task
export function deleteTask(id: number): Promise<void> {
    return request<void>(`/tasks/${id}`, { 
        method: "DELETE" 
    });
}