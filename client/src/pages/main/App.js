import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material";

import { instance } from "../../core/axios";
import { MessagesContext } from "../../Context/Context";
import {theme} from './theme'

import List from "./List";
import Content from "./Content";

function Main({ user }) {
  // socket content and send user id to socket server
  const socket = io("https://twitterchat-node-2020.herokuapp.com/");
  useEffect(() => {
    socket.emit("addUser", user?._id);
  }, [socket, user?._id]);

  const params = useParams();
  // initial states
  const [conversation, setConversation] = useState([]);
  const [CurrentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null);

  
  const receiverId = useMemo(() => {
    return  Array.isArray(CurrentConversation?.members) &&
    CurrentConversation?.members?.find((member) => member !== user?._id)
    // eslint-disable-next-line
  }, [CurrentConversation])

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      CurrentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    // eslint-disable-next-line
  }, [arrivalMessage, CurrentConversation]);

  useEffect(() => {
    instance
      .get("/conversation")
      .then(({ data }) => setConversation(data.data))
      .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    if (params.id !== undefined) {
      instance
        .get(`/conversation/detail/${params?.id}`)
        .then(({ data }) => setCurrentConversation(data.data))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    if (CurrentConversation?._id) {
      setLoading(true);
      instance
        .get(`/message/${CurrentConversation?._id}`)
        .then(({ data }) => setMessages(data.data))
        .catch((err) => console.log(err))
        .finally(() =>  setLoading(false))
        
    }
  }, [CurrentConversation]);


  return (
    <MessagesContext.Provider
      value={{ user, conversation,setConversation, messages, CurrentConversation, setCurrentConversation, socket, setMessages, receiverId, loading }}
    >
      <div className="App">
        <ThemeProvider theme={theme}>
          <div className="wrapper">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <List />
                </Grid>
                <Grid item xs={9}>
                  <Content
                    CurrentConversation={CurrentConversation}
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
        </ThemeProvider>
      </div>
    </MessagesContext.Provider>
  );
}

export default Main;
