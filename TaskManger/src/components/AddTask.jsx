import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const HandleSubmit = (e) => {
    e.preventDefault();
    if(text.trim()){
    dispatch(addTask(text));
    setText('')
    }
  };

  return (
    <form className="form" onSubmit={HandleSubmit}>
      <input
        className="input"
        onChange={(e) => setText(e.target.value)}
        type="text"
        value={text}
        placeholder="Enter Task"
      />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
};

export default AddTask;
