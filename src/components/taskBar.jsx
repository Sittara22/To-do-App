import React, { useContext, useEffect } from 'react'
import './taskBar.css'
import { useState } from 'react'
import {TodoContext} from '../context/Context'
import TodoTask from './TodoTask'
import {v4 as uuidv4} from 'uuid'

function TaskBar() {
  const [taskValue,setTaskValue]=useState('');
  const [todoTask,setTodoTask]=useContext(TodoContext);


 const handleOnChange=(e)=>{
    setTaskValue(e.target.value);
     
  }
const handleAddTask=()=>{
  const newTodo={
    id:uuidv4(),
    text:taskValue,
    completed:false,   
  };
    if(taskValue){
        setTodoTask([...todoTask,newTodo]);
         setTaskValue("");         
    }

        
}
useEffect(()=>{

  localStorage.setItem('todos',JSON.stringify(todoTask));
},[todoTask])

  return (
    <>
    <h1 className='title'>TO-DO-App</h1>
    <div className='taskBarSection'>
    <input type="text" value={taskValue} onChange={handleOnChange} className='inputBar'/>
    <button className='addBtn' onClick={handleAddTask}>Add</button>
  </div>
  <div className="taskList">
       <div className="tasks">
        {todoTask.map(((todo,index)=>
            (
              <TodoTask key={todo.id} id={todo.id} text={todo.text} index={index} completed={todo.completed} />
            )
        )) }
       </div>
  </div> </>
    

  )
}

export default TaskBar
