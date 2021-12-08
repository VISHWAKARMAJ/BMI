import React, { useState } from "react";

function TodoItem(props) {
  const { children, done, onClick, onDelete } = props;
  return (
    <li style={{ color: done ? "green" : "red" }}>
      {children}
      <button
        onClick={() => {
          /// write the logic to change the state
          onClick(children);
        }}
      >
        Done
      </button>
      <button
        onClick={() => {
          /// write the logic to change the state
          onDelete(children);
        }}
      >
        Delete
      </button>
    </li>
  );
}

function TodoInput(props) {
  const { addOneItem } = props;
  const [input, setInput] = useState("");
  return [
    <input
      type="text"
      value={input}
      onChange={(event) => {
        setInput(event.target.value);
      }}
    />,
    <button
      onClick={() => {
        if (input !== "") {
          addOneItem(input);
          setInput("");
        }
      }}
    >
      Add
    </button>
  ];
}

//! sol 1 -- input in TodoList
//! -- big component is re-rendered, lot more responsibility
//! sol 2 -- TodoInput
//! -- we don't access to parent's state
function TodoList() {
  const [tasks, setTasks] = useState([]);

  function addOneItem(str) {
    setTasks([...tasks, { content: str, done: false }]);
  }

  function deleteOneItem(str) {
    const newArr = tasks.filter((task) => task.content !== str);
    setTasks(newArr);
  }

  function setItemToTrue(str) {
    const newArr = tasks.map((task) => {
      if (task.content === str) {
        task.done = !task.done;
        return task;
      }
      return task;
    });
    setTasks(newArr);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <TodoInput addOneItem={addOneItem} />
      <ul>
        {tasks.map((task) => {
          return (
            <TodoItem
              onDelete={deleteOneItem}
              onClick={setItemToTrue}
              done={task.done}
            >
              {task.content}
            </TodoItem>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}