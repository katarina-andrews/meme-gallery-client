import "./App.css";
import { useState } from "react";
import MemeList from "./components/MemeList";
import LoginForm from "./components/LoginForm";
import AddMemeForm from "./components/AddMemeForm";
import LogoutBtn from "./components/LogoutBtn";

function App() {
  const [auth, setAuth] = useState(() => {
    const localAuth = localStorage.getItem("auth");

    return localAuth ? JSON.parse(localAuth) : null;
  });
  const [memes, setMemes] = useState([]);

  return (
    <>
      <header className="mb-5">
        <h1 className="font-bold text-4xl">Meme Gallery API</h1>
      </header>
      <main className="min-h-[100vw]">
        {!auth ? (
          <LoginForm setAuth={setAuth} />
        ) : (
          <p>Welcome, {auth.username} </p>
        )}
        {auth ? <LogoutBtn /> : null}

        <h2>Meme Galley</h2>

        {auth?.token && <AddMemeForm setMemes={setMemes} auth={auth} />}
        <MemeList memes={memes} setMemes={setMemes} auth={auth} />
      </main>
      <footer className="text-center">&copy; Katarina Andrews</footer>
    </>
  );
}

export default App;
