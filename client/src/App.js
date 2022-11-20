import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./utils/protectRouter";
import { get_token } from "./core/axios";
import { instance } from "./core/axios";
import Loading from "./components/Loading";

import "./index.css";

const Login = React.lazy(() => import("./pages/login"));
const Main = React.lazy(() => import("./pages/main/App"));
const Register = React.lazy(() => import("./pages/register"));

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    instance
      .get("/users")
      .then(({ data }) => setUser(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={get_token()}>
              <Main user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute user={get_token()}>
              <Main user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default App;

// pages login register  api connect 50
// api connect with message  20
// connect websocets 0
