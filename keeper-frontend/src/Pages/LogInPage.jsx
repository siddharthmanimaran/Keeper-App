import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function LogInPage() {
  // const  = props.match.params.id;
  let history = useHistory();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userData);
    axios
      .post("http://localhost:4000/keeper/logIn", userData)
      .then((res) => {
        console.log("response from back", res);
        if (res.data.success) {
          history.push(`/MainPage/${res.data.userDetails._id}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {});
    setUserData({
      userName: "",
      password: "",
    });
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setUserData((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Log In</h2>
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          name="userName"
          placeholder="userName"
          value={userData.userName}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={userData.password}
          onChange={handleChange}
        />
        <Link to="/SignUp">
          <p style={{ textAlign: "right" }}>Create New Account</p>
        </Link>
        <button
          type="submit"
          value="Submit"
          className="formSubmit"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogInPage;
