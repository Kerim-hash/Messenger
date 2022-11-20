import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { MessagesContext } from "../../../../Context/Context";
import { useStylesMessages } from "../theme";
import { instance } from "../../../../core/axios";

const ContentActive = () => {
  const { CurrentConversation, user, socket, receiverId, setMessages } =
    useContext(MessagesContext);
  const classes = useStylesMessages();
  const [value, setValue] = useState("");

  const sendMessage = () => {
    const data = {
      sender: user._id,
      text: value,
      conversationId: CurrentConversation._id,
      createdAt: Date.now(),
    };
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: value,
    });
    setMessages((prev) => [...prev, data]);
    setValue("");
    instance.post("/message", data);
  };

  return (
    <Box className={classes.messageForm}>
      <OutlinedInput
        fullWidth
        className={classes.outlinedInput}
        placeholder="Напишите сообщение"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <IconButton onClick={() => sendMessage()} disabled={value === ""}>
        <SendOutlinedIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default ContentActive;
