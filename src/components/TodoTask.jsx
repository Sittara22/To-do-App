import React from "react";
import { useContext,useRef } from "react";
import './taskBar.css'
import bin from '../assets/bin.png'
import { TodoContext } from '../context/Context'
const TodoTask = ({ id, text,index, completed }) => {
  const [todoTask, setTodoTask] = useContext(TodoContext);

  const delTask = (taskId) => {
    const newTodoArr = todoTask.filter(task => task.id !== taskId);
    setTodoTask(newTodoArr);
  }

  const handleIsChecked = (taskId) => {
    const newTodoList = todoTask.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoTask(newTodoList);
  }
  //use Ref for drag Items
  const dragItems = useRef(null);
  const dragOverItems = useRef(null);  
  //handle sort
  const handlesort=()=>{
    let _TodoTask=[...todoTask];
    //remove and save the drag item content
    const dragItemContent=_TodoTask.splice(dragItems.current,1)[0];
    console.log(dragItemContent)
    //switch the position
    _TodoTask.splice(dragOverItems.current,0,dragItemContent);
        //reset the positions
    dragItems.current=null;
    dragOverItems.current=null;
    console.log(dragOverItems)

    //update the actual array
    setTodoTask(_TodoTask);
  }     


  return (
    <div className="taskContainer" draggable="true"
     onDragStart={(e) =>(dragItems.current=index)} 
     onDragEnter={(e) =>(dragOverItems.current=index)}  
     onDragEnd={handlesort}
     onDragOver={(e) => e.preventDefault()}
     > 
      <span className='taskText' style={{ color: completed ? "gray" : "white", textDecoration: completed ? "line-through" : "none" }}>
        {text} 
        <div className='taskStatus'>
          <img src={bin} alt="delete" onClick={() => delTask(id)} className='delIcon'/>
          <input type='checkbox' checked={completed} onChange={() => handleIsChecked(id)} />
        </div>
      </span>
    </div>
  );
}

export default TodoTask;
