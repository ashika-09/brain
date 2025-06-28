import React from "react";

interface LogoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Logout: React.FC<LogoutPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-60 z-50">
      <div className="bg-zinc-800 rounded-lg shadow-lg w-80 p-6 outline outline-1 outline-white">
        <h2 className="text-lg font-semibold ">Log Out</h2>
        <p className="mt-2 ">Do you want to log out?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-200 text-zinc-800 rounded hover:bg-zinc-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
