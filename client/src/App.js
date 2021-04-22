import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar, { } from "./shared/NavBar"

import Login from ".//pages/Login";
import Project from "./pages/Project";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <NavBar />
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/projects" component={Project} /> 
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
