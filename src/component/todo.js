import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';


import "./todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, seteEitedTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function inputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      if (!tasks.some((item) => item.text === newTask)) {
        setTasks([
          ...tasks,
          { text: newTask, completed: false, isEditing: false },
        ]);
        setNewTask("");
      } else {
        alert("⚠️ Task already exists!");
      }
    } else {
      alert("Enter Something 😠");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else {
      alert("Already at the Top 👑");
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else {
      alert("Already at the Bottom ⬇️");
    }
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function handleEdit(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function inputChangeUpdate(event){
     seteEitedTask(event.target.value)
 
  }

  function updateTask(index){
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text:editedTask,isEditing:false  };
      }
      return task;
    });
    setTasks(updatedTasks);
    setNewTask("")
  }

  return (
    <div className="todo-list">
      <h1>TO DO List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Task....."
          value={newTask}
          onChange={inputChange}
        />
        <button className="addbtn" onClick={addTask}>
          ADD
        </button>
      </div>

      <div className="tasklist-container">
        <div className="tasklist">
          <ol>
            {tasks.map((task, index) =>
              task.isEditing ? (
                <div key={index} className="singletask">
                  <div>
                    <input
                      className="updateInput"
                      type="text"
                      placeholder="Enter updated Task..."
                      value={editedTask}
                      onChange={inputChangeUpdate}
                    />
                    <button className="addbtn" onClick={()=> updateTask(index)}>
                    Update
                    </button>
                  </div>
                  <li
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <span className="text">{task.text}</span>
                    <div className="btndiv">
                    <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                      <button
                        className="dltbtn"
                        onClick={() => deleteTask(index)}
                      >
                        ✖️
                      </button>
                      <button
                        className="movebtn"
                        onClick={() => moveTaskUp(index)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="movebtn"
                        onClick={() => moveTaskDown(index)}
                      >
                        ⬇️
                      </button>
                    </div>
                  </li>
                </div>
              ) : (
                <div key={index} className="singletask">
                  <li
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <span className="text">{task.text}</span>
                    <div className="btndiv">
                    <FontAwesomeIcon icon={faPenToSquare} onClick={()=> handleEdit(index)}/>
                      <button
                        className="dltbtn"
                        onClick={() => deleteTask(index)}
                      >
                        ✖️
                      </button>
                      <button
                        className="movebtn"
                        onClick={() => moveTaskUp(index)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="movebtn"
                        onClick={() => moveTaskDown(index)}
                      >
                        ⬇️
                      </button>
                    </div>
                  </li>
                </div>
              )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Todo;
