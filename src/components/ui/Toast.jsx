import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

export const Toast = ({ title, message, type = "success", onClose }) => {
  const styles = {
    success: {
      border: "bg-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
    },
    error: {
      border: "bg-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      icon: <XCircleIcon className="w-6 h-6 text-red-600" />,
    },
    info: {
      border: "bg-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: <InformationCircleIcon className="w-6 h-6 text-blue-600" />,
    },
    warning: {
      border: "bg-yellow-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />,
    },
  };

  const style = styles[type];

  return (
    <div className="flex w-[360px] bg-white rounded-xl shadow-md overflow-hidden">
      {/* Left Border */}
      <div className={`w-1.5 ${style.border}`}></div>

      {/* Content */}
      <div className="flex items-start gap-3 p-4 w-full">
        {/* Icon */}

        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${style.iconBg}`}
        >
          <span className="">{style.icon}</span>
        </div>

        {/* Text */}
        <div className="flex-1 items-center">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{message}</p>
        </div>

        <button className="cursor-pointer" onClick={onClose}>
          <XCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};