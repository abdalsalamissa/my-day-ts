import { NavLink } from "react-router-dom";

interface SidebarProps {
    totalCount: number;
    completedCount: number;
}

export default function Sidebar({ totalCount, completedCount }: SidebarProps) {
    return(
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon"><i className="fa-solid fa-check"></i></span>
                <span>My Day</span>
            </div>

            <nav className="nav">
                <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}>
                    <span>Home Page</span>
                    <span className="badge">{totalCount}</span>
                </NavLink>
                <NavLink to="/completed" className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}>
                    <span>Completed Tasks</span>
                    <span className="badge">{completedCount}</span>
                </NavLink>
            </nav>

            <NavLink to="/create" className={({ isActive }) => `nav-item new-task ${isActive ? "is-active" : ""}`}>
                <i className="fa-solid fa-plus"></i>New Task
            </NavLink>
        </aside>
    );
}