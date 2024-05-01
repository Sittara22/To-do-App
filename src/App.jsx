import TaskBar from './components/taskBar'
import { TodoProvider } from './context/Context'


function App() {

  return (
    <TodoProvider>
    <>
      <TaskBar/>
    </>
    </TodoProvider>   
    
  )
}

export default App
