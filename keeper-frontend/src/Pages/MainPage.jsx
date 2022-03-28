import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import Note from "../components/Note";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function MainPage(props) {
  const [insertNote, setInsertNote] = useState({
    title: "",
    content: "",
    _id: "",
  });
  const [subNote, setSubNote] = useState([]);
  const [savedData, setSaveData] = useState([]);
  const userId = props.match.params.userId;

  function handleChange(event) {
    const { name, value } = event.target;

    setInsertNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function getData() {
    axios
      .get("http://localhost:4000/keeper/getKeeperDetails/" + userId)
      .then((res) => {
        if (res.data.success) {
          console.log("Result :" + res.data.result);
          setSaveData(res.data.result);
        } else {
          setSaveData([]);
        }
      })
      .catch((err) => {
      });
  }
  function submitNote(event) {
    event.preventDefault();
    console.log(insertNote);
  
    setSubNote((prevItems) => {
      return [...prevItems, insertNote];
    });
    axios
      .post("http://localhost:4000/keeper/add/" + userId, insertNote)
      .then((res) => {
        if (res.status === 200) {
          //alert(JSON.stringify(res));
          alert("successfully added");
          // alert();

          getData();
        } else {
          alert("type Something");
        }
      })
      .catch((err) => {
        alert("type Something");
      });
    debugger;
    console.log("saved data :" + savedData);
    setInsertNote("");
   
  }


  return (
    <div>
      <div className="container-edit">
        <form>
          <input
            name="title"
            onChange={handleChange}
            value={insertNote.title || ""}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={insertNote.content || ""}
            placeholder="Take a note..."
            rows="3"
          />
          <button onClick={submitNote} className="addButton">
            <AddIcon />
          </button>
        </form>
      </div>

      <div>
        {savedData.map((savedNote, index) => (
          <Note
            key={index}
            id={savedNote._id}
            title={savedNote.title}
            content={savedNote.content}
            // onDelete={getData}
          />
        ))}
      </div>
    </div>
  );
}
export default MainPage;
