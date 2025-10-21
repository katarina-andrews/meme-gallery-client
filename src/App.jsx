import { useState, useEffect } from "react";
import "./App.css";
import { api } from "./api";

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    api
      .get("/memes")
      .then(function (response) {
        // handle success
        console.log(response);
        setMemes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <>
      <header className="mb-5">
        <h1 className="font-bold text-4xl">Meme Gallery API</h1>
      </header>
      <main className="min-h-[100vw]">
        <h2>Meme Galley</h2>
        <div className="flex justify-between flex-auto flex-wrap">
          {memes.map((meme) => {
            return (
              <>
                <div className="m-3">
                  <h3>{meme.title}</h3>
                  <img src={meme.url} alt={meme.title} className="w-54"/>
                </div>
              </>
            );
          })}
        </div>
      </main>
      <footer className="text-center">&copy; Katarina Andrews</footer>
    </>
  );
}

export default App;
