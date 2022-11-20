import React, { useContext } from "react";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import ContentTop from "./Top";
import ContentDialog from "./Dialog";
import ContentActive from "./Active";
import { MessagesContext } from "../../../Context/Context";

const Content = () => {

  const { CurrentConversation } = useContext(MessagesContext)
  
  return (
    <div>
      {!CurrentConversation ? (
        <Box
          style={{
            padding: 15,
            minHeight: "94vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
        </Box>
      ) : (
        <>
          <ContentTop />
          <ContentDialog  />
          <ContentActive  />
        </>
      )}
    </div>
  );
};

export default Content;
