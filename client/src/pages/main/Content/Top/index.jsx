import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { MessagesContext } from "../../../../Context/Context";
import AvatarComponent from "../../../../components/Avatar";
import { instance } from "../../../../core/axios";

const ContentTop = () => {
  const { receiverId } = useContext(MessagesContext);
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(false);
  // get user detail by receiver ID
  useEffect(() => {
    if (receiverId !== undefined) {
      setLoading(true);
      const getUser = async () => {
        try {
          const res = await instance.get(`users/detail/${receiverId}`);
          setReceiver(res.data.data);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      getUser();
    }
  }, [receiverId]);

  return (
    <Box
      display="flex"
      sx={{ borderBottom: "1px solid #fff", p: 1, height: 70 }}
    >
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <AvatarComponent fullName={receiver?.username} />
          <Box flex ml={2}>
            <Typography variant="h6" color="primary">
              {receiver?.username}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ContentTop;
