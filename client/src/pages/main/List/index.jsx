import React, { useState, useRef, useContext } from "react";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import cookie from 'cookie_js'
import classNames from "classnames";

import ItemCard from "../../../components/Card";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect } from "react";
import { instance } from "../../../core/axios";
import { useStylesAside } from "./theme";
import AvatarComponent from "../../../components/Avatar";
import { MessagesContext } from "../../../Context/Context";
import { StyledBadge } from "../../../components/Card/StyledBadge";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { conversation, setConversation, user, socket, setCurrentConversation} =
    useContext(MessagesContext);

  const classes = useStylesAside();
  const navigate = useNavigate()
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [response, setResponse] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const rootEl = useRef(null);
  useEffect(() => {
    if (focus) {
      const onClick = (e) =>
        rootEl.current.contains(e.target) || setFocus(false);
      document.addEventListener("click", onClick);
    }
  }, [focus]);

  const handleChangeSearch = (e) => {
    setValue(e.target.value);
  };

  //  Hook will return only the last value (which we passed) ...
  // if more than 500ms has passed since last call.
  // Otherwise, it will return the previous value of search.
  //  The goal is to call filter only after the user has stopped
  //  typing so we don't end up calling the filter too often.
  const debounce = useDebounce(handleChangeSearch, 500);

  // get user for search results
  useEffect(() => {
    instance
      .get(`users/${value}`)
      .then(({ data }) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [value]);

  // callback fot add conversation
  const addConversation = (id) => {
    const data = {
      senderId: user?._id,
      receiverId: id,
    };
    instance
      .post("conversation", data)
      .then(({ data }) => {
        setConversation((users) => [...users, data.data]);
        setResponse({ success: true, message: data.message });
        setFocus(false);
      })
      .catch((err) =>
        setResponse({ error: true, message: err.response.data.message })
      )
      .finally(() => {
        setTimeout(() => {
          setResponse({
            loading: false,
            success: false,
            error: false,
            message: "",
          });
        }, 1500);
      });
  };

  // socket for get online Users 
  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    // eslint-disable-next-line
  }, [user?._id]);


  const logout = () => {
    cookie.remove('token');
    navigate('/login')
  }

  const deleteConversationById = (event, id) => {
    event.preventDefault()
    event.stopPropagation();
    instance
      .delete(`/conversation/${id}`)
      .then(({ data }) => {
        //setConversation/
        navigate('/')
        setCurrentConversation(null)
        setConversation(conversation.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <Box sx={{ borderRight: "1px solid #fff", height: "100%", p: 2 }}>
      <Snackbar
        open={response.error || response.success}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={response.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>

      <div style={{ position: "sticky", top: 0 }}>
        <div ref={rootEl}>
          <OutlinedInput
            fullWidth
            placeholder="Поиск"
            onChange={debounce}
            onFocus={() => setFocus(true)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          {focus && (
            <Box className={classes.listUsers}>

              {users !== undefined && users?.length > 0 ? (
                users.map((item) => {
                  return (
                    <Box
                      key={item._id}
                      className={classNames(classes.user, {[classes.disabled]: conversation.find((m) => m.members.includes(item?._id))})}
                      onClick={() => addConversation(item._id)}
                    >
                      <AvatarComponent fullName={item?.username} />
                      <Box className={classes.userinfo}>
                        <Typography variant="body1">
                          @{item?.username}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  variant="body2"
                  // color="text."
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    paddingBottom: 30,
                  }}
                >
                  Попробуйте поискать людей, темы или ключевые слова
                </Typography>
              )}
            </Box>
          )}
        </div>

        {conversation.length <= 0 ? (
          <Box style={{ maxWidth: 295 }}>
            <Typography
              variant="h4"
              color="text.secondary"
              style={{ fontWeight: 800, lineHeight: 1 }}
            >
              Вы не выбрали сообщение
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontWeight: 500, marginTop: 10, marginBottom: 30 }}
            >
              Выберите одно из своих сообщений или напишите новое.
            </Typography>
          </Box>
        ) : (
          <Box style={{height: "70vh", overflow: "scroll", }}>
          {conversation?.map((item) => {
            return (
              <div key={item._id}>
                <ItemCard conversation={item} onlineUsers={onlineUsers} deleteConversationById={deleteConversationById} />
              </div>
            );
          })}
          </Box>
        )}
      </div>


      <Card variant="outlined" sx={{position: 'absolute', alignItems: 'center'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <AvatarComponent fullName={user?.username} />
          </StyledBadge>
        <Box ml={2}>
          <Typography variant="h6" color="primary">
            {user?.username}
          </Typography>
        </Box>
        <Box ml={2}>
        <IconButton onClick={() => logout()}>
           <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default List;
