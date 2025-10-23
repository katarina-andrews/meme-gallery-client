import { useState, useEffect } from "react";
import { api } from "../api";

export default function MemeList() {
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
    <div className="flex justify-between flex-auto flex-wrap">
      {memes.map((meme) => {
        return (
          <div key={meme.id} className="m-3">
            <h3>{meme.title}</h3>
            <img src={meme.url} alt={meme.title} className="w-54" />
          </div>
        );
      })}
    </div>
  );
}
