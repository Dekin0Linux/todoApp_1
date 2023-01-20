
import './App.css';
import React,{useState,useEffect} from 'react'
import {FaPlus,FaCheckCircle,FaFlagCheckered} from 'react-icons/fa'
import Task from './components/Task';

function App() {

  const [todos,setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || []
  })

  //task data states
  const [task,setTask] = useState('')
  const [time,setTime] = useState('')
  const [isComplete,setIsComplete] = useState(false)

  // Delete Todo
  function deleteTodo(id) {
    let index = id
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }

  //Update Todo
  function updateTodo(id) {
    let index = id
    todos[index].isComplete = true
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    // Save the todos to local storage when they update
    if(todos !== []){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    

  },[todos]);

  //setting task
  const saveTask = (e)=>{
    e.preventDefault()
    if(task !== '' && isComplete === false){
      setTodos([...todos, {task,time,isComplete}])
      setTask('')
      setTime('')
      setIsComplete(false)
    }else{
      alert('Fill in a task')
    }
  }
  

  return (
    <div className='bg-purple-500 w-screen md:h-screen flex justify-center align-center p-16 '>
      <div className='bg-white shadow-lg p-2 rounded-lg md:w-4/5 flex flex-wrap w-screen h-full'>

          <div className='flex-none px-5'>
            {/* USER ICONE AND NAME */}
            <div className='flex items-center md:mb-2'>
              <img src="https://www.yugatech.com/wp-content/uploads/2020/09/Facebook-Avatar.jpg" alt="imgHere" className='rounded-full w-14 h-14'/>
              <div className='mx-3 pt-5'>
                <p>My List</p>
                <p className='text-purple-800 font-bold text-xl'>Welcome User</p>
              </div>
            </div>

            <hr className='bg-purple-500 h-1 rounded-xl'/>

            <p className='font-semibold my-2'>Legend</p>
            <ul className='m-5 '>
              <li className='flex items-center md:my-4'><FaCheckCircle color='green' className='mr-3'/>Completed</li>
              <li className='flex items-center md:my-4'><span className='w-4 h-4 p-1 bg-orange-400 rounded-full mr-3'></span>Uncompleted</li>
              <li className='flex items-center md:my-4'><FaFlagCheckered color='green' className='mr-3'/>Achieved</li>
            </ul>
            <div>
              
            </div>
          </div>

          {/* task side */}

          <div className='grow bg-purple-500 rounded-lg md:px-44 px-3 overflow-auto md:h-full'>

            <div className='sticky top-0 bg-purple-500 mb-5 shadow-lg pt-4'>
              <h3 className='text-white font-semibold text-2xl'>Today's main focus</h3>
              <h3 className='text-white font-bold text-4xl'>Set Goals For Today</h3>

              {/* INPUT TASK */}
              <form className='bg-white p-5 rounded-lg my-10 flex items-center ' onSubmit={saveTask}>
                <input type="text" placeholder='What is your next task?' className='grow outline-none' onChange={(e)=>setTask(e.target.value)} value={task}/>
                <input type="time" className='mx-2 outline-none' onChange={(e)=>setTime(e.target.value)} value={time}/>
                <button type='submit' className='bg-green-600 p-2 rounded-md'><FaPlus color='white'/></button>
              </form>

            </div>

            

            {/* TASKS  */}
            <div className='h-full'>
              {todos && todos.map((todo,index)=><Task task={todo.task} time={todo.time} key={index} isComplete={todo.isComplete} delTodo={deleteTodo} todoID={index} updTodo={updateTodo}/>)}
              
             
            </div>
            
            



          </div>
      </div>
    </div>
  );
}

export default App;
