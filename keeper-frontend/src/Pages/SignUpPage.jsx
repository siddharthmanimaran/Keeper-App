import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

function SignUpPage() {
  let history = useHistory();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    PhoneNo: "",
    password: "",
  });

  function handleUser(event) {
    const { name, value } = event.target;

    setUserData((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(userData);

    axios
      .post("http://localhost:4000/keeper/signUp", userData)
      .then((res) => {
        if (res.status === 200) {
          history.push("/");

          alert(JSON.stringify(res));
        } else {
          alert("fill the form");
        }
      })
      .catch((err) => {});
    setUserData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit} action="/signUp" method="post">
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>

          <label htmlFor="fname">First name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleUser}
            value={userData.firstName}
          />
          <label htmlFor="lname">Last name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleUser}
            value={userData.lastName}
          />
          <label htmlFor="userName">User name:</label>
          <input
            type="text"
            name="userName"
            onChange={handleUser}
            value={userData.userName}
          />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="@mail.com"
            onChange={handleUser}
            value={userData.email}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Must have 8 characters"
            onChange={handleUser}
            value={userData.password}
          />

          <Link to="/LogIn">
            <p style={{ textAlign: "right" }}>Already have Account?</p>
          </Link>
          <button
            type="submit"
            value="Submit"
            className="formSubmit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
