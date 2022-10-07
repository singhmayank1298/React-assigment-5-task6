import React, { useState } from "react";
import { useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoding, setisLoding] = useState(false);
  const [error, seterror] = useState(null);
  const [intervalId, setIntervalId] = useState(0);

  const fetchMoviesHandler = async () => {
    setisLoding(true);
    seterror(null);

    try {
      const reponse = await fetch("https://swapi.py4e.com/api/film/");
      console.log(reponse); // VV. Importent we should use axios because fetch will not throw a real error means when get response like 401 then there error massege is somthing So fetch will not so this,We have to handle error manualy other wise it throw error in then rest line where that fetch variable is use
      if (!reponse.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await reponse.json(); //await is only use before Promises

      //console.log(data);
      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseData: moviesData.release_data,
        };
      });

      setMovies(transformedMovies);
      setisLoding(false);
    } catch (error) {
      // let count = 0;
      // if (count === 0) {   // this Approvh does not work
      //   count = 1;
      //   const id = setInterval(() => {
      //     console.log(intervalId);
      //     fetchMoviesHandler();
      //   }, 5000);

      //   console.log(intervalId);
      // }

      const id = setInterval(async () => {
        try {
          const response = await fetch("https://swapi.py4e.com/api/films/");
          if (!response.ok) {
            throw new Error("ndidni");
          }
          console.log("hello");
        } catch (error) {
          console.log(error);
        }
      }, 1000);
      setIntervalId(id);
      setisLoding(false);
    }
  };

  const cancelHandler = () => {
    clearInterval(intervalId);
    console.log(intervalId);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && Movies.length > 0 && <MoviesList movies={Movies} />}
        {!isLoding && Movies.length === 0 && !error && <p>not Found</p>}
        {isLoding && <p>Loding...</p>}
        {!isLoding && error && <p>{error}</p>}
        <button onClick={cancelHandler}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
