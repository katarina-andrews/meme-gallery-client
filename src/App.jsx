import "./App.css";
import { useState } from "react";
import MemeList from "./components/MemeList";
import LoginForm from "./components/LoginForm";

function App() {
 const [auth, setAuth] = useState(null);

  return (
    <>
      <header className="mb-5">
        <h1 className="font-bold text-4xl">Meme Gallery API</h1>
      </header>
      <main className="min-h-[100vw]">
        {!auth ? <LoginForm setAuth={setAuth} /> : <p>Welcome, {auth.user} </p>}
        <h2>Meme Galley</h2>
        {/* <MemeList /> */}
      </main>
      <footer className="text-center">&copy; Katarina Andrews</footer>
    </>
  );
}

export default App;
