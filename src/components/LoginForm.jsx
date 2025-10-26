import React from "react";
import { api } from "../api";

export default function LoginForm({ setAuth }) {
  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    api
      .post("/auth/login", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        console.log(response);
        setAuth(response.data);
        localStorage.setItem("auth", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <form
      onSubmit={(event) => loginSubmitHandler(event)}
      className="flex flex-col justify-between w-md mx-auto my-5 h-48"
    >
      <label htmlFor="username">Username</label>
      <input
        className="border-2 p-1"
        type="text"
        name="username"
        id="username"
      />
      <label htmlFor="password">Password</label>
      <input
        className="border-2 p-1"
        type="password"
        name="password"
        id="password"
      />
      <button className="border cursor-pointer" type="submit" value="Submit ">
        Submit
      </button>
    </form>
  );
}
