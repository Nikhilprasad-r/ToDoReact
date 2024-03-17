import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const [editing, setEditing] = useState(false); // State to track editing
  const [paragraphHeight, setParagraphHeight] = useState(0); // State to track paragraph height
  const [textareaHeight, setTextareaHeight] = useState(0); // State to track textarea height

  const inputRef = useRef(null);
  const paragraphRef = useRef(null);

  const changeFocus = () => {
    setEditing(true); // Set editing to true when focusing on textarea
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      // Check if Enter key is pressed
      updateTodo({ id, item: value });
      setEditing(false); // Set editing to false after updating
    }
  };

  useEffect(() => {
    // Calculate and set the height of the paragraph based on its content
    if (paragraphRef.current) {
      setParagraphHeight(paragraphRef.current.clientHeight);
    }
    // Calculate and set the height of the textarea based on its content
    if (inputRef.current) {
      setTextareaHeight(inputRef.current.scrollHeight);
    }
  }, [editing, item.item]);

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{ scale: 0.9, transition: { type: "spring", duration: 0.1 } }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
      style={{
        height: editing ? textareaHeight + 100 : paragraphHeight + 100,
        overflow: "hidden",
      }} // Adjust height dynamically
    >
      <h4 className="title">{item.title}</h4>

      {editing ? (
        <textarea
          ref={inputRef}
          defaultValue={item.item}
          onBlur={(e) => update(item.id, e.target.value, e)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              update(item.id, e.target.value, e);
            }
          }}
          style={{ height: textareaHeight, width: "100%", overflow: "hidden" }}
        />
      ) : (
        <p
          ref={paragraphRef}
          onClick={() => changeFocus()}
          style={{ cursor: "pointer", width: "100%", overflow: "hidden" }}
        >
          {item.item}
        </p>
      )}

      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setEditing(true)} // Start editing when Edit button is clicked
        >
          <RiEdit2Fill />
        </motion.button>
        {item.completed ? (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <RiCheckboxLine />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <RiCheckboxBlankLine />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <MdDeleteForever />
        </motion.button>
      </div>
      {item.completed ? (
        <span className="completed">done</span>
      ) : (
        <span className="incomplete">incomplete</span>
      )}
    </motion.li>
  );
};

export default TodoItem;
