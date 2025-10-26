import React from "react";

export default function LogoutBtn() {

  const handleLogout = () => {
    localStorage.removeItem("auth");

    window.location.reload()

  };

  return (
    <div>
        <button className="border cursor-pointer" type="submit" onClick={handleLogout}>Logout</button>
    </div>
  );
}
