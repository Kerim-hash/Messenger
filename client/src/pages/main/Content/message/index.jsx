import React from 'react'

import Box from '@mui/material/Box'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import format from 'date-fns/format';
import classNames from 'classnames';

import { useStylesMessages } from '../theme'

const MessageCard = ({own, text, createdAt}) => {

  const classes = useStylesMessages();
  
  return (
    <>
    <Box className={classNames(classes.message, { [classes.messageOwn]: own })}>
        {text}
    </Box>
    <span className={classes.messageDate}>{createdAt && format(new Date(createdAt), 'HH:mm')} <CheckOutlinedIcon sx={{ fontSize: 14 }} /></span>
</>
  )
}

export default MessageCard