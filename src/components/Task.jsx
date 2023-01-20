import React from 'react'
import {FaCheckCircle,FaTrash,FaFlagCheckered} from 'react-icons/fa'

function Task({task,time,delTodo,todoID,updTodo,isComplete}) {
  return (
    <div className='bg-white rounded-lg flex p-4 my-2 items-center'>
        {
            isComplete ? <FaCheckCircle color='green' className='mr-3'/> : <span className='w-5 h-5 p-1 bg-orange-400 rounded-full mr-3'></span>
        }
        
        <p className='grow text-gray-500 font-semibold'>{task}</p>
        <div className='flex items-center justify-between gap-4'>
            <span className='font-medium'>{time ? time : '00:00'}</span>
            <a href='/' type='button' onClick={()=>updTodo(todoID)}>{!isComplete ? <FaFlagCheckered color='green'/>: ''}</a>
            <a href='/' type='button' onClick={()=>delTodo(todoID)}><FaTrash color='red'/></a>
        </div>
        
    </div>
  )
}

export default Task