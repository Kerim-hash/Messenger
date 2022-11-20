const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({message: 'help'})
})

const AuthRoutes = require("./routes/auth");
const ConversationRoutes = require("./routes/Conversation");
const MessageRoutes = require("./routes/message");
const UserRoutes = require("./routes/user");
// routes
app.use("/auth", AuthRoutes);
app.use("/conversation", ConversationRoutes);
app.use("/message", MessageRoutes);
app.use("/users", UserRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`server listening on ${port}`);
  }
});
