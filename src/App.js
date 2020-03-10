import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import MovieDetail from "./pages/movieDetail";
import RedirectPage from "./components/redirectPage"
import RedirectPageMovie from "./components/redirectPageMovie"
import MovieTrailer from "./pages/movieTrailer"
function App() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Router>
        <Switch>
          <Route path="/movieDetail/:id">
            <MovieDetail />
          </Route>
          <Route path="/movieTrailer/:id">
            <MovieTrailer/>
          </Route>
          <Route
          exact
          path="/redirect-page/:id"
          component={RedirectPage}/>
           <Route
          exact
          path="/redirect-page-movie/:id"
          component={RedirectPageMovie}/>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
