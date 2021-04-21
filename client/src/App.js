import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import Login from ".//pages/Login";
import Project from "./pages/Project";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/projects">
            <Project />
          </Route>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
