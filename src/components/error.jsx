/* eslint-disable react/prop-types */
import { AlertCircle } from "lucide-react";

const Error = ({message}) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-destructive px-3 py-1.5 bg-destructive/10 rounded-lg animate-in fade-in slide-in-from-top-1 duration-300">
      <AlertCircle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );
};

export default Error;
