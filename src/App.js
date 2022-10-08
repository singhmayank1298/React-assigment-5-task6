import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Form from "./components/Form/Form";

function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoding, setisLoding] = useState(false);
  const [error, seterror] = useState(null);
  const [intervalId, setIntervalId] = useState(0);

  const fetchMoviesHandler = useCallback(async () => {
    setisLoding(true);
    seterror(null);

    try {
      const reponse = await fetch(
        "https://react-http-f431c-default-rtdb.firebaseio.com/movies.json"
      ); // from /movies is extra ,it means we are making a new node in database);
      console.log(reponse); // VV. Importent we should use axios because fetch will not throw a real error means when get response like 401 then there error massege is somthing So fetch will not so this,We have to handle error manualy other wise it throw error in then rest line where that fetch variable is use
      if (!reponse.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await reponse.json(); //await is only use before Promises

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseData: data[key].releaseData,
          openingText: data[key].openingText,
        });
      }

      console.log(data);

      setMovies(loadedMovies);
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
          const response = await fetch(
            "https://react-http-f431c-default-rtdb.firebaseio.com/movies.json"
          ); // from /movies is extra ,it means we are making a new node in database
          if (!response.ok) {
            throw new Error("ndidni");
          }
          console.log("hello");
        } catch (error) {
          console.log(error);
        }
      }, 5000);
      setIntervalId(id);
      setisLoding(false);
    }
  }, []); // [ ] this should be needed like useEffect

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (NewMovieObj) => {
    const reponse = await fetch(
      "https://react-http-f431c-default-rtdb.firebaseio.com/movies.json",
      {
        method: "Post",
        body: JSON.stringify(NewMovieObj),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await reponse.json(); // in reponse we will get the id auto genrated
    // fetchMoviesHandler();
    console.log(data);
  };

  const cancelHandler = () => {
    clearInterval(intervalId);
    console.log(intervalId);
  };

  const movieDeleteHandler = async (id) => {
    console.log(id);
    const response = await fetch(
      `https://react-http-f431c-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.json());
  };

  return (
    <React.Fragment>
      <section>
        <Form addMovieHandler={addMovieHandler}></Form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && Movies.length > 0 && (
          <MoviesList movieDeleteHandler={movieDeleteHandler} movies={Movies} />
        )}
        {!isLoding && Movies.length === 0 && !error && <p>not Found</p>}
        {isLoding && <p>Loding...</p>}
        {!isLoding && error && <p>{error}</p>}
        <button onClick={cancelHandler}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
