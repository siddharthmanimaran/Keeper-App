const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const keeperRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const bcrypt = require("bcrypt");

let Keeper = require("./Keeper.model");
const newUser = require("./SignUp.model");

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Keeper", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

keeperRoutes.route("/add/:userId").post(function (req, res) {
  //console.log("added content--->", req.body);
  //console.log("id", req.params.userId);
  let keeper = new Keeper();
  keeper.title = req.body.title;
  keeper.content = req.body.content;
  keeper.userId = req.params.userId;
  keeper
    .save()
    .then((x) => {
      console.log(x);
      res.status(200).json({ keeper: "record added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new record failed");
    });
});

keeperRoutes.post("/signUp", async (req, res) => {
  console.log(" ", req.body);
  const salt = await bcrypt.genSalt(10);

  let newuser = new newUser();
  newuser.firstName = req.body.firstName;
  newuser.lastName = req.body.lastName;
  newuser.userName = req.body.userName;
  newuser.email = req.body.email;
  newuser.password = req.body.password;
  newuser.password = await bcrypt.hash(newuser.password, salt);
  newuser
    .save()
    .then((x) => {
      res.status(200).json({ newuser: "user added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ newuser: "adding user failed" });
    });
});

keeperRoutes.route("/logIn").post((req, res) => {
  console.log("Body--->", req.body);

  newUser.find({ userName: req.body.userName }, function (err, user) {
    console.log("------>", user);
    if (err) {
      res.status(400).send("Service not available");
    }
    if (user.length) {
      const userDetails = user[0];
      bcrypt
        .compare(req.body.password, userDetails.password)
        .then((confirmPassWord) => {
          console.log("Confirm passed result--->", confirmPassWord);
          if (confirmPassWord) {
            res.json({
              success: true,
              userDetails: userDetails,
            });
          } else {
            res.json({
              success: false,
              message: "Invalid password",
            });
          }
        })
        .catch((err) => {
          console.log("Error while password check");
        });
    } else {
      res.json({
        success: false,
        message: "User not found",
      });
    }
  });
});

keeperRoutes.route("/getKeeperDetails/:id").get(function (req, res) {
  // console.log("show particular");
  let id = req.params.id;
  Keeper.find(
    {
      userId: mongoose.Types.ObjectId(id),
    },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      if (data.length) {
        // console.log(data);
        res.json({
          success: true,
          result: data,
        });
      } else {
        res.json({
          success: false,
          result: data,
        });
      }
    }
  );
});

keeperRoutes.route("/deleteData/:id").delete((req, res) => {
  console.log("id--->", req.params.id);
  let id = req.params.id;

  Keeper.findByIdAndDelete({
    _id: mongoose.Types.ObjectId(id),
  })
    .then((x) => {
      res.status(200).send("data deleted");
      console.log("done");
    })
    .catch((err) => {
      res.status(400).send("fail to delete");
    });
});

app.use("/keeper", keeperRoutes);
app.use("/signUp", keeperRoutes);
app.use("/logIn", keeperRoutes);
app.use("/add/:userId", keeperRoutes);
app.use("/getKeeperDetails/:id", keeperRoutes);
app.use("/deleteData/:id", keeperRoutes);

app.listen(PORT, console.log(`Server started at port ${PORT}`));
