import React from 'react'
import './taskBar.css'
import { useState } from 'react'
import bin from '../assets/bin.png'
import { useEffect } from 'react';

function TaskBar() {
  const [taskValue,setTaskValue]=useState('');
  const [todoTask,setTodoTask]=useState([]);
  //retrieve data
useEffect(()=>{
    const storedTodo=JSON.parse(localStorage.getItem('todoTask')); 
    if(storedTodo){
      setTodoTask(storedTodo);
    }
    
    },[])
  //store data into local storage 
 useEffect(()=>{
    localStorage.setItem('todoTask',JSON.stringify(todoTask));
},[todoTask])

 const handleOnChange=(e)=>{
    setTaskValue(e.target.value);
     
  }
const handleAddTask=()=>{
    if(taskValue){
        setTodoTask([...todoTask,taskValue]);
         setTaskValue("");         
    }

        
}
const delTask=(i)=>{
const newTodoArr=[...todoTask];
newTodoArr.splice(i,1);
setTodoTask(newTodoArr);
}
  return (
    <>
    <h1 className='title'>TO-DO-App</h1>
    <div className='taskBarSection'>
    <input type="text" value={taskValue} onChange={handleOnChange} className='inputBar'/>
    <button className='addBtn' onClick={handleAddTask}>Add</button>
  </div>
  <div className="taskList">
       <ul className="tasks">
        {todoTask.map(((todo,i)=>
            (<li className='taskText' key={i}>{todo} 
        <img src={bin} onClick={()=>{delTask(i)}} className='delIcon'/></li>)
        )) }
       </ul>
  </div>
  </>
    

  )
}

export default TaskBar
