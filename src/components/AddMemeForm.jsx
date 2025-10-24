import { useState } from "react";
import { api } from "../api";

export default function AddMemeForm({ setMemes, auth }) {
  const [showForm, setShowForm] = useState(false);

  const addMemeFormHandler = async (event) => {
    event.preventDefault();

    api
      .post(
        "/memes",
        {
          title: event.target.title.value,
          url: event.target.url.value,
        },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        setMemes((oldMemes) => [...oldMemes, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {showForm ? (
        <form
          onSubmit={(event) => addMemeFormHandler(event)}
          className="border flex flex-col p-3"
          action=""
        >
          <label htmlFor="title">Title</label>
          <input
            className="border rounded p-1"
            type="text"
            name="title"
            id="title"
          />
          <label htmlFor="url">Url</label>
          <input
            className="border rounded p-1"
            type="text"
            name="url"
            id="url"
          />
          <input
            className="border rounded mt-5 cursor-pointer py-2"
            type="submit"
            value="Add your meme"
          />
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="border-2 px-3 py-2 rounded cursor-pointer"
        >
          Add a Meme
        </button>
      )}
    </>
  );
}
