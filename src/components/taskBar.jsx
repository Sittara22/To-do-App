import React, { useContext, useEffect } from 'react'
import './taskBar.css'
import { useState } from 'react'
import {TodoContext} from '../context/Context'
import TodoTask from './TodoTask'
import {v4 as uuidv4} from 'uuid'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DndContext, closestCenter,TouchSensor,
  MouseSensor, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable'
function TaskBar() {
  const [taskValue,setTaskValue]=useState('');
  const [todoTask,setTodoTask]=useContext(TodoContext);
  // Define sensors for pointer and keyboard events
 const sensors = useSensors(
  useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  }),
  useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 6,
    },
  }),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);
//get Task Position
const getTaskPos = id => todoTask.findIndex(task=>task.id === id);
//onDragEnd handler
const onDragEnd=e=>{
const{active,over}=e;
if(over===null){
  console.log(active.id);
  return;
}
if(active.id===over.id)  return;
 
setTodoTask((todoTask)=>{
  const orgPos=getTaskPos(active.id);
  const newPos=getTaskPos(over.id);
  return arrayMove(todoTask,orgPos,newPos)
});
  
}


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
       <DndContext sensors={sensors} collisionDetection={closestCenter}onDragEnd={onDragEnd}>
       <SortableContext items={todoTask} strategy={verticalListSortingStrategy}>
        {todoTask.map(((todo,index)=>
            (
              <TodoTask key={todo.id} taskValue={taskValue} id={todo.id} text={todo.text} index={index} completed={todo.completed} />
            )
        )) }
       </SortableContext>
       </DndContext>
       </div>
  </div> 

  </>
    

  )
}

export default TaskBar
