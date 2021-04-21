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
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Login />
            </Route>
            <Route path="/projects">
              <Project />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
