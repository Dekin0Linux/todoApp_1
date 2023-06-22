
import './App.css';
import React,{useState,useEffect} from 'react'
import {FaPlus,FaCheckCircle,FaFlagCheckered} from 'react-icons/fa'
import Task from './components/Task';

function App() {

  const [todos,setTodos] = useState(() => {
    //if theres data in our localstorage we get it else return an empty array
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
    // Saves the todos to local storage when theres an update
    if(todos !== []){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  },[todos]);

  //setting task  or creating a todo
  const saveTask = (e)=>{
    e.preventDefault()
    //Check if the form feilds are not empty
    if(task !== '' && isComplete === false){
      //spread previous todos and add a the new todo
      setTodos([...todos,{task,time,isComplete}])
      //set values to empty
      setTask('')
      setTime('')
      setIsComplete(false)
    }else{
      alert('Fill in a task')
    }
  }
  

  return (
    <div className=' w-screen flex justify-center align-center md:p-16 p-5'>
      <div className='bg-white shadow-lg p-2 rounded-lg md:w-4/5 flex flex-wrap w-screen '>

          <div className='px-5'>
            {/* USER ICON AND NAME */}
            <div className='flex items-center md:mb-2 '>
              <img src="https://www.yugatech.com/wp-content/uploads/2020/09/Facebook-Avatar.jpg" alt="imgHere" className='rounded-full w-14 h-14'/>
              <div className='mx-3 pt-5'>
                <p>My List</p>
                <p className='text-purple-800 font-bold text-xl'>Welcome User</p>
              </div>
            </div>

            <hr className='bg-purple-500 h-1 rounded-xl my-5'/>

            <p className='font-semibold my-2 hidden md:block'>Legend</p>
            <ul className='md:m-5 hidden md:block'>
              <li className='flex items-center md:my-4'><FaCheckCircle color='green' className='mr-3'/>Completed</li>
              <li className='flex items-center md:my-4'><span className='w-4 h-4 p-1 bg-orange-400 rounded-full mr-3'></span>Uncompleted</li>
              <li className='flex items-center md:my-4'><FaFlagCheckered color='green' className='mr-3'/>Achieved</li>
            </ul>
            <div>
              
            </div>
          </div>

          {/* task side */}
          <div className='grow bg-purple-500 rounded-lg md:px-44 px-3 '>
            <div className='sticky top-0 bg-purple-500 mb-5 shadow-lg pt-4 pb-4'>
              <h3 className='text-white font-semibold text-2xl'>Today's main focus</h3>
              <h3 className='text-white font-bold text-4xl'>Set Goals For Today</h3>

              {/* INPUT TASK */}
              <form className='bg-white p-5 rounded-lg my-10 flex items-center  ' onSubmit={saveTask}>
                <input type="text" placeholder='What is your next task?' className='grow outline-none' onChange={(e)=>setTask(e.target.value)} value={task}/>
                <input type="time" className='mx-2 outline-none' onChange={(e)=>setTime(e.target.value)} value={time}/>
                <button type='submit' className='bg-green-600 p-2 rounded-md z-50'><FaPlus color='white'/></button>
              </form>

            </div>

            {/* TASKS  OUTPUTS*/}
            <div className='overflow-auto h-auto'>
              <div >
                {todos && todos.map((todo,index)=><Task task={todo} key={index} isComplete={todo.isComplete} delTodo={deleteTodo} todoID={index} updTodo={updateTodo}/>)}
              </div>
            </div>
            
          </div>
      </div>
    </div>
  );
}

export default App;
