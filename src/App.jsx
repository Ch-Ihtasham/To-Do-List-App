import { useState, useEffect } from 'react'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoItems } from './components/TodoItems'
import { TodoProvider } from './contexts/TodoContext'

function App() {


  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [filterTodo, setFilterTodo] = useState([])

  function addTodo(todo) {
    setTodos((preV) => [todo, ...preV])
  }
  function updateTodo(id, todo) {
    setTodos((prev) => prev.map((Todo) => Todo.id === id ? { ...Todo, todo: todo } : Todo))
  }
  function deleteTodo(id) {
    setTodos((preV) => preV.filter((Todo) => Todo.id !== id))
  }
  function toggleComplete(id) {
    setTodos((preV) => preV.map((Todo) => Todo.id === id ? { ...Todo, completed: !Todo.completed } : Todo))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (filter === 'all') {
      setFilterTodo(todos)
    }
    else if (filter === 'pending') {
      setFilterTodo(todos.filter((todo) => !todo.completed))
    }
    else if (filter === 'completed') {
      setFilterTodo(todos.filter((todo) => todo.completed))
    }
  })
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-white min-h-screen py-8">
        <div className="bg-[#003F62] w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-[#EDA415] text-3xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4 ">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            <div className='flex justify-evenly w-full'>
              <button className='rounded-lg px-8 py-1 bg-[#EDA415] text-white ' onClick={() => setFilter('all')} >All</button>
              <button className='rounded-lg px-8 py-1 bg-[#EDA415] text-white ' onClick={() => setFilter('pending')}>Pending</button>
              <button className='rounded-lg px-8 py-1 bg-[#EDA415] text-white ' onClick={() => setFilter('completed')}>Completed</button>
            </div>
            {/*Loop and Add TodoItem here */}
            {filterTodo.map((todo) => (
              <div className='w-full' key={todo.id}>
                <TodoItems todo={todo} />
              </div>
            ))}

          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
