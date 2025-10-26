import { useEffect } from "react";
import { api } from "../api";
import { MdDeleteForever } from "react-icons/md";

export default function MemeList({ memes, setMemes, auth }) {
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

  const handleDeleteMeme = async (memeId) => {
    api.delete(`/memes/${memeId}`, {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }).then(function (response) {
      console.log(response);
      setMemes((oldMemes) => {
        return oldMemes.filter((meme) => {
          return meme.id != memeId;
        });
      });
    });
  };
  return (
    <section className="flex justify-between flex-auto flex-wrap">
      {memes.map((meme) => {
        return (
          <div key={meme.id} className="m-3">
            <img src={meme.url} alt={meme.title} className="w-54" />
            <div>
              <h3>{meme.title}</h3>
              {auth && auth.id === meme.userId && (
                <button onClick={() => handleDeleteMeme(meme.id)}
                title="Delete meme" className="cursor-pointer">
                  <MdDeleteForever />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
