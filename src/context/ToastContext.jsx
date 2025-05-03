import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";

const ToastContext = createContext(undefined);

// Maximum number of toasts to show at once
const MAX_TOASTS = 3;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => {
      // If we already have the maximum number of toasts, remove the oldest one
      const updatedToasts = prevToasts.length >= MAX_TOASTS
        ? prevToasts.slice(1)
        : prevToasts;
      
      return [...updatedToasts, { id, message, type, duration }];
    });
    return id;
  }, []);

  const closeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container fixed top-0 right-0 left-0 z-50 flex flex-col items-center pt-4" aria-live="polite">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="toast-wrapper mb-2"
            style={{
              position: "relative",
              marginTop: index > 0 ? "0.5rem" : "0",
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => closeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
