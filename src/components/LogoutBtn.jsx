import React from "react";

export default function LogoutBtn() {
  const handleLogout = () => {
    localStorage.removeItem("auth");

    window.location.reload();
  };

  return (
    <div>
      <button
        className="blue-btn"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
