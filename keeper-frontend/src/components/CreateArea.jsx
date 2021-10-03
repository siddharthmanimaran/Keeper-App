import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function CreateArea(props) {
  const userId = props.match.params.userId;

  console.log(userId);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    event.preventDefault();
    console.log(note);
    // note.userId = userId;
    axios
      .post("http://localhost:4000/keeper/add/" + userId, note)
      .then((res) => {
        if (res.status === 200) {
          alert(JSON.stringify(res));
        } else {
          alert("type Something");
        }
      })
      .catch((err) => {});

    setNote({
      title: "",
      content: "",
      // userId: "",
    });
  }

  return (
    <>
      <div>
        <form>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <button onClick={submitNote} className="addButton">
            <AddIcon />
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateArea;
