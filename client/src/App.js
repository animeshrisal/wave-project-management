import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar, { } from "./shared/NavBar"

import Login from "./pages/Login";
import Project from "./pages/Project";
import { PrivateRoute } from "./shared/PrivateRoute";
import Profile from "./pages/Profile";
import 'antd/dist/antd.css';
import Task from "./pages/Task";
import { AuthenticationProvider } from "./context/AuthContext";
import Notification from "./pages/Notification";
import Board from "./pages/Board";

const queryClient = new QueryClient();

function App() {


  return (
    <AuthenticationProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
          <NavBar />
          <div>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/projects" component={Project} /> 
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/notification" component={Notification} />
            <PrivateRoute exact path="/projects/:projectId" component={Task} />
            <PrivateRoute exact path="/projects/:projectId/task/1/board" component={Board} />
          </div>

      </Router>
    </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;
