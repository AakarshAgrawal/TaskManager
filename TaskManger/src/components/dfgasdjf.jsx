import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleDone, editTask } from "../redux/taskSlice";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [checkedTasks, setCheckedTasks] = useState({});

  const handleCheckbox = (id) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    dispatch(editTask({ id, newTask: editText }));
    setEditId(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={checkedTasks[task.id] || false}
            onChange={() => handleCheckbox(task.id)}
          />

          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <span>{task.text}</span>
          )}

          {checkedTasks[task.id] && editId !== task.id && (
            <>
              <button onClick={() => handleEdit(task.id, task.text)}>
                Edit
              </button>
              <button onClick={() => dispatch(deleteTask(task.id))}>
                Delete
              </button>
              <button onClick={() => dispatch(toggleDone(task.id))}>
                {task.completed ? "Undo" : "Done"}
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
