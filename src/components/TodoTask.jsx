import React from "react";
import { useContext,useRef } from "react";
import './taskBar.css'
import bin from '../assets/bin.png'
import { TodoContext } from '../context/Context'
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"


const TodoTask = ({ id, text, completed }) => {
  const [todoTask, setTodoTask] = useContext(TodoContext);
  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id});
  
 
  // Handler for deleting a task
  const delTask = (taskId) => {
    console.log("Delete")
    const newTodoArr = todoTask.filter(task => task.id !== taskId);
    setTodoTask(newTodoArr);
  }
  //style for drag and drop
  const style={
    transition,
    transform:CSS.Transform.toString(transform)
  }

  // Handler for toggling task completion status
  const handleIsChecked = (taskId) => {
    console.log(taskId)
    const newTodoList = todoTask.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoTask(newTodoList);
  }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} >
         <span className='taskText' style={{ color: completed ? "gray" : "white", textDecoration: completed ? "line-through" : "none" }}>
            {text}
            <div className='taskStatus'>
              <img src={bin} alt="delete" onClick={() => delTask(id)} className='delIcon' />
              <input type='checkbox' checked={completed} onChange={() => handleIsChecked(id)} />
            </div>
          </span>
    </div>
    );
}

export default TodoTask;
