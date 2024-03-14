import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { BsFillClipboardPlusFill } from "react-icons/bs";

import { motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");

  const add = () => {
    if (title === "") {
      alert("Title cannot be Empty");
    } else {
      props.addTodo({
        title: title,
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTitle("");
      setTodo("");
    }
  };
  //console.log("props from store", props);
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="todo-input"
        value={title}
        placeholder="ToDo Title"
      />
      <input
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        className="todo-input"
        value={todo}
        placeholder="ToDo Description"
      />

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <BsFillClipboardPlusFill
          size={40}
          className="add-btn"
          onClick={() => add()}
        />
      </motion.div>

      <br />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
