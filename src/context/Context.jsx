import { createContext ,useContext,useState} from "react";

export const TodoContext=createContext();
export const TodoProvider=(props)=>{
    const getTodo=JSON.parse(localStorage.getItem('todos'));
    const [todoTask,setTodoTask]=useState(getTodo?getTodo:[]);
    return(

     <TodoContext.Provider value={[todoTask,setTodoTask]}>
            {props.children}
     </TodoContext.Provider>


    );

}