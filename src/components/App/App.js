import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Header from "../Header/Header";
import Movie from "../Movie/Movie";
import Search from "../Search/Search";
import { initialState, reducer } from "./reducer";

const apiKey = "45f0782a";
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${apiKey}`; // you should replace this with yours


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('use effect')
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

    const search = searchValue => {
      dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});

      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
            });
          } else {
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
            });
          }
        });
  	};

    const { movies, errorMessage, loading } = state;
    return (
     <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;