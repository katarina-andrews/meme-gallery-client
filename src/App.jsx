import "./App.css";
import { useState } from "react";
import MemeList from "./components/MemeList";
import LoginForm from "./components/LoginForm";
import AddMemeForm from "./components/AddMemeForm";
import LogoutBtn from "./components/LogoutBtn";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [auth, setAuth] = useState(() => {
    const localAuth = localStorage.getItem("auth");

    return localAuth ? JSON.parse(localAuth) : null;
  });
  const [memes, setMemes] = useState([]);

  return (
    <>
      <header className="p-3 m-5 flex items-center justify-center">
        <h1 className="font-bold text-4xl">Meme Gallery API</h1>
      </header>
      <main>
        <section className="p-3 m-5 flex flex-col items-center justify-center gap-3">
          {!auth?.token ? <p>Please login to add and manage memes</p> : null}
          {!auth ? (
            <LoginForm setAuth={setAuth} />
          ) : (
            <p className="">Welcome, {auth.username} </p>
          )}
          {!auth ? <RegisterForm setAuth={setAuth} /> : null}
          {auth ? <LogoutBtn /> : null}

          {auth?.token && <AddMemeForm setMemes={setMemes} auth={auth} />}
        </section>
        <section className="min-h-[100vw]">
          <h2 className="text-3xl text-center p-3">Meme Galley</h2>
          <MemeList memes={memes} setMemes={setMemes} auth={auth} />
        </section>
      </main>
      <footer className="overline mt-2.5 text-center lowercase tracking-[-1px]">
        &copy; Katarina Andrews
      </footer>
    </>
  );
}

export default App;
