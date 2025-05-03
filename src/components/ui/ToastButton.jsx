import React from "react";
import { useToast } from "../../context/ToastContext";

const ToastButton = ({ 
  children, 
  message = "This feature is coming soon!", 
  type = "info", 
  duration = 3000, 
  className,
  icon,
  ...props 
}) => {
  const { showToast } = useToast();

  const handleClick = (e) => {
    e.preventDefault();
    showToast(message, type, duration);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button 
      {...props}
      className={`transition-all duration-200 ${className}`} 
      onClick={handleClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default ToastButton; 