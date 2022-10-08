import Input from "./Input";

const Form = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();

    const NewMovieObj = {
      title: e.target[0].value,
      openingText: e.target[1].value,
      releaseDate: e.target[2].value,
    };
    console.log(NewMovieObj);
    props.addMovieHandler(NewMovieObj);
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        title={"Titel"}
        openingText={"Opening Text"}
        releaseDate={" Release Date"}
        Input1={{ id: "title", type: "text" }}
        Input2={{ id: "openingText", type: "text" }}
        Input3={{ id: "releaseDate", type: "date" }}
      ></Input>

      <button type="submit">Add Movies</button>
    </form>
  );
};

export default Form;
