import { useEffect } from "react";

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, onClose, duration = 7000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return(
        <div className="toast-container">
            <div className="toast-message" onClick={onClose}>
                {message}
                {/* <button className="toast-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button> */}
            </div>
        </div>
    );
}