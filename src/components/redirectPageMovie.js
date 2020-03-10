import React from "react";
import { Redirect } from "react-router-dom";

const RedirectPageMovie = props => {
  return <Redirect to={`/movieTrailer/${props.match.params.id}`} 
    />;
};

export default RedirectPageMovie;