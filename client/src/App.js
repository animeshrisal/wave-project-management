import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar, { } from "./shared/NavBar"

import Login from "./pages/Login";
import Project from "./pages/Project";
import { PrivateRoute } from "./shared/PrivateRoute";
import Profile from "./pages/Profile";
import 'antd/dist/antd.css';
import Task from "./pages/Task";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <NavBar />
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/projects" component={Project} /> 
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/:projectId" component={Task} />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
