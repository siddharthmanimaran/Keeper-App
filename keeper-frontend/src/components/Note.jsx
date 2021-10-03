import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Note(props) {
  function onDelete() {
    props.onDelete();
  }
  function handleClick() {
    // console.log("id:" + props.id);
    // props.onDelete.props.id
    axios
      .delete("http://localhost:4000/keeper/deleteData/" + props.id)
      .then((res) => {
        console.log(res.data);
      });
    onDelete();
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <IconButton aria-label="delete" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Note;
