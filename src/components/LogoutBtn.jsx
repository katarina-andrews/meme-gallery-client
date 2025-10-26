import React from "react";

export default function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("auth");

    window.location.reload();
  };

  return (
    <div>
      <button
        className="rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
