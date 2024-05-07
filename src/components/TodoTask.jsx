import React, { useState } from "react";
import { useContext,useRef } from "react";
import './taskBar.css'
import bin from '../assets/bin.png'
import edit from '../assets/edit.png'
import { TodoContext } from '../context/Context'
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"


const TodoTask = ({ id,taskValue, text, completed }) => {
  //Todo Task Array
  const [todoTask, setTodoTask] = useContext(TodoContext);
  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id});
  //Edit task Usestates
  const[isEditTask,setIsEditTask]=useState(false);
  const [isEditText,setIsEditText]=useState(text);
  const [editTaskId,setEditTaskId]=useState('');
 
  // Handler for deleting a task
  const delTask = (taskId) => {
    console.log("Delete")
    const newTodoArr = todoTask.filter(task => task.id !== taskId);
    setTodoTask(newTodoArr);
  }
  //Handler for editing task
  const editTask=(taskId)=>{
    setIsEditTask(true);
    setEditTaskId(taskId);
  }
  //Save Edited task
const saveEditedTask=()=>{
const newTodoTask=todoTask.map((task)=>{
  if(task.id === editTaskId){
    
    return{...task, text:isEditTask}

  }
  return task;
    
})
setTodoTask(newTodoTask);
setEditTaskId('');
setIsEditTask(false);
  }
  //style for drag and drop
  const style={
    transition,
    transform:CSS.Transform.toString(transform)
  }

  // Handler for toggling task completion status
  const handleIsChecked = (taskId) => {
    const newTodoList = todoTask.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoTask(newTodoList);
  }
  return (
    <div className="taskDiv"  ref={setNodeRef} {...attributes} {...listeners} style={style} >
      {isEditTask?(
        <input
          type="text"
          value={isEditText}//set the value of text to the current task
          onChange={(e) => setIsEditText(e.target.value)}
          onBlur={saveEditedTask}
          autoFocus
          className='editBar'
        />
      ) :(<span className='taskText' style={{ color: completed ? "gray" : "white", textDecoration: completed ? "line-through" : "none" }}>
      {isEditText}
      <div className='taskStatus'>
      <img src={edit} alt="edit" onClick={() => editTask(id)} className='editIcon' />
        <img src={bin} alt="delete" onClick={() => delTask(id)} className='delIcon' />
        <input className="check" type='checkbox' checked={completed} onChange={() => handleIsChecked(id)} />
      </div>
    </span>

)}</div>)
}

export default TodoTask;
