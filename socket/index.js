const app = require("express")();
const cors = require("cors");
app.use(cors());
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.send("Running");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users?.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(users)
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    user &&
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
  });
});

server.listen(8000, () => {
  console.log(`Express is working on port 8000`);
});
