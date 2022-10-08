import "./Input.css";

const Input = (props) => {
  console.log(props.title);
  return (
    <div className="nsjs">
      <label>{props.title}</label>
      <input {...props.Input1}></input>
      <label>{props.openingText}</label>
      <textarea {...props.Input2}></textarea>
      <label>{props.releaseDate}</label>
      <input {...props.Input3}></input>
    </div>
  );
};

export default Input;
