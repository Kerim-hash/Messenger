import React, { useRef, useEffect, useContext, memo } from "react";
import Box from "@mui/material/Box";
import classNames from "classnames";

import MessageCard from "../message";
import Loading from "../../../../components/Loading";
import { useStylesMessages } from "../theme";
import { MessagesContext } from "../../../../Context/Context";

const ContentDialog = memo(() => {
  
  const { user, messages, loading } = useContext(MessagesContext)
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const classes = useStylesMessages();

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ height: "76vh", overflow: "scroll",  }}
    >
      {loading ? <Loading item/> : 
      Array.isArray(messages) &&
        messages?.map((item) => {
          return (
            <div
              ref={scrollRef}
              key={item._id}
              className={classNames(classes.messageWrapper, {
                [classes.messageWrapperOwn]: item.sender === user._id,
              })}
            >
              <MessageCard
                text={item.text}
                own={item.sender === user._id}
                createdAt={item.createdAt}
              />
            </div>
          );
        })}
    </Box>
  );
});

export default ContentDialog;
