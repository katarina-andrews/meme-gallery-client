import React from "react";

export default function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("auth");

    window.location.reload();
  };

  return (
    <div>
      <button
        className="cursor-pointer rounded-md bg-blue-700 hover:bg-blue-800 px-3 py-2 text-sm font-semibold text-white"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
