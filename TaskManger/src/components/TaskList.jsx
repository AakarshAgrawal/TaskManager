import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, editTask, toggleDone } from '../redux/taskSlice'

const TaskList = () => {
    const [editID , setEditId] = useState(null)
    const [editText, setEditText] = useState("")
    const [checkedTasks, setCheckedTasks] = useState({})
    const tasks = useSelector((state) => state.task.list)
    const dispatch = useDispatch();

    const HandleCheckbox = (id) => {
    setCheckedTasks((prev) => ({...prev, [id] : !prev[id] }))
    }

    const HandleEdit = (id, editText) => {
    setEditId(id)
    setEditText(editText)
    }

    const SaveEdit = (id) => {
    if(editText.trim() === "") return
    dispatch(editTask({ id, newTask: editText }))
    setEditId(null)
    }

  return (
    <ul>
        {
            tasks.map((task) => (
                <li className='task-list' key={task.id}> <input onChange={() => HandleCheckbox(task.id)} type="checkbox" checked = {checkedTasks[task.id] || false}/> 
                { editID === task.id ? 
                <>
                <input className="input" type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => SaveEdit(task.id)}>Update</button>
                </>: (<span className={task.completed ? 'task-completed' : ''}>{task.text}</span>)}

                {checkedTasks[task.id] && editID !== task.id && (
                    <>
                    <button onClick={() => HandleEdit(task.id, task.text)}>Edit</button>
                    <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                    <button onClick={() => dispatch(toggleDone(task.id))} >{task.completed ? "Undo" : "Done"}</button>
                    </>
                )}
                
                </li>
            ))
        }
    </ul>
  )
}

export default TaskList