import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import cookie from "cookie_js";
import * as yup from "yup";

import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { instance } from "../../core/axios";

const LoginForm = yup
  .object({
    email: yup
      .string()
      .email("email must be a valid email")
      .required("Enter your email"),
    password: yup
      .string()
      .min(8)
      .required("Password must be at least 8 characters"),
  })
  .required();

const Login = ({ setUser }) => {
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
    message: "",
  });

  const onSubmit = async (data) => {
    setResponse({ loading: true });
    instance
      .post("/auth/login", data)
      .then(({ data }) => {
        cookie.set("token", data.token);
        setUser(data.user);
        instance.defaults.headers.Authorization = `Bearer ${data.token}`;
        setResponse({ success: true, message: data.message });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setResponse({ error: true, message: err.response.data.message });
      });
    setTimeout(() => {
      setResponse({
        loading: false,
        success: false,
        error: false,
        message: "",
      });
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
        sx={{ height: "100vh" }}
      >
        <Grid item xs={6}>
          <img
            className="auth-img"
            src="https://plagiarismdetector.net/img/illustration.svg"
            alt="illustration"
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4" gutterBottom>
            Log in to your personal account
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {" "}
            No account yet? <NavLink to="/register">Sign up</NavLink>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="column"
              rowSpacing={2}
              sx={{ maxWidth: 400, mt: 2 }}
            >
              <TextField
                variant="outlined"
                sx={{ mb: 2 }}
                type="email"
                placeholder="Email"
                error={!!errors.email}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <TextField
                sx={{ mb: 2 }}
                type="password"
                placeholder="Enter your password"
                error={!!errors.password}
                {...register("password", { required: true })}
              />
              <LoadingButton
                type="submit"
                variant="outlined"
                loading={response.loading}
                disabled={
                  response.loading || response.error || response.success
                }
              >
                Sign in
              </LoadingButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
