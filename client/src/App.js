import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./components/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({})

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} 
          currentMovie={currentMovie}
          setCurrentMovie={setCurrentMovie}
          addToSavedList={addToSavedList}
          />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <MovieForm {...props} currentMovie={currentMovie}/>;
        }}
      />
      <Route
        path="/add-movie"
        render={props => {
          return <MovieForm {...props}/>;
        }}
      />
    </>
  );
};

export default App;
