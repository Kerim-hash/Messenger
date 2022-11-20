import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import AvatarComponent from "../Avatar";
import { instance } from "../../core/axios";
import { MessagesContext } from "../../Context/Context";
import { StyledBadge } from "./StyledBadge";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const ItemCard = ({ conversation, onlineUsers, deleteConversationById }) => {
  const { user } = useContext(MessagesContext);
  const [receiver, setReceiver] = useState([]);

  // get user detail by  conversation ID
  React.useEffect(() => {
    const friendId =
      conversation && conversation.members?.find((m) => m !== user?._id);
    const getUser = async () => {
      try {
        const res = await instance.get(`users/detail/${friendId}`);
        setReceiver(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [conversation, user?._id]);

 
  return (
    <NavLink to={`/${conversation._id}`} style={{ textDecoration: "none" }}>
      <Card variant="outlined">
        {onlineUsers?.map((item) => item.userId)?.includes(receiver?._id) ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <AvatarComponent fullName={receiver?.username} />
          </StyledBadge>
        ) : (
          <AvatarComponent fullName={receiver?.username} />
        )}
        <Box flex ml={2}>
          <Typography variant="h6" color="primary">
            {receiver?.username}
          </Typography>
        </Box>
        <Box ml={"auto"}>
          <IconButton onClick={(e) => deleteConversationById(e, conversation?._id)}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Box>
      </Card>
    </NavLink>
  );
};

export default ItemCard;
