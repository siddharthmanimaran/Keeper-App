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

  // function handleChange(event) {
  //   const { name, value } = event.target;

  //   setInsertNote((prevNote) => {
  //     return {
  //       ...prevNote,
  //       [name]: value,
  //     };
  //   });
  // }
  // function alert() {
  //   return (
  //     <Alert variant="filled" severity="success">
  //       This is a success alert — check it out!
  //     </Alert>
  //   );
  // }
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
        // alert("type Something");
      });
  }
  // getData();
  function submitNote(event) {
    event.preventDefault();
    console.log(insertNote);
    // console.log(userId);
    // if (insertNote.length) {
    //   alert
    // } else {
    //   alert("Please fill details");
    // }
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
    // return (
    //   <Alert variant="filled" severity="success">
    //     This is a success alert — check it out!
    //   </Alert>
    // );
  }

  // function deleteNote(id) {
  //   setSubNote((prevNotes) => {
  //     return prevNotes.filter((note, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  // function handleClick(event) {
  //   console.log(event);
  // const id = axios.delete("/deleteData/" + _id).then((res) => {
  //   console.log(res.data);
  // });
  // }

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

      {/* <div className="note">
        <h1>{savedData.title}</h1>
        <p>{savedData.content}</p>
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </div> */}

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
