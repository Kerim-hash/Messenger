import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from '@mui/lab/LoadingButton';

import { instance } from "../../core/axios";
const LoginForm = yup
  .object({
    email: yup
      .string()
      .email("email must be a valid email")
      .required("Enter your email"),
    username: yup
      .string()
      .required("Enter your username"),
    password: yup
      .string()
      .min(8)
      .required("Password must be at least 8 characters"),
  })
  .required();

const Login = () => {
  let navigate = useNavigate();
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginForm),
  });

  // initial state
  const [response, setResponse] = useState({
    loading: false,
    success: false,
    error: false,
  });
  
  const onSubmit = async (data) => {
    setResponse({ loading: true });
    instance
      .post("/auth/register", data)
      .then(({ data }) => {
        setResponse({ success: true, message: data.message  });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        setResponse({ error: true, message: err.response.data.message });
      });
    setTimeout(() => {
      setResponse({ loading: false, success: false, error: false });
    }, 1500);
  };

  return (
    <div className="auth-wrapper">
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
      <Grid
        container
        flex
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{height: '100vh'}}
      >
        <Grid item xs={6}>
          <img
            className="auth-img"
            src="https://uploads-ssl.webflow.com/5c8607099eacd1746f6743c0/5d6be775a3a53e0896ff5931_Teamwork.svg"
            alt="illustration"
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4" gutterBottom>
          Create an account
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {" "}
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" rowSpacing={2} sx={{maxWidth: 400, mt:2}}>
            <TextField
              variant="outlined"
              sx={{mb:2}}
              type="text"
              placeholder="Username"
              error={!!errors.username}
              {...register("username", { required: true })}
            />
            <TextField
              variant="outlined"
              sx={{mb:2}}
              type="email"
              placeholder="Email"
              error={!!errors.email}
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <TextField
              sx={{mb:2}}
              type="password"
              placeholder="Enter your password"
              error={!!errors.password}
              {...register("password", { required: true })}
            />
            <LoadingButton
              type="submit"
              variant="outlined"
              loading={response.loading}
              disabled={response.loading || response.error || response.success}
            >
               Sign up
            </LoadingButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
