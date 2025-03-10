import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
export const TodoForm = () => {
    const [todo, setTodo] = useState('')
    const { addTodo } = useTodo()
    function handelSubmit(e) {
        e.preventDefault()
        if (!todo) return
        addTodo({ id: Date.now(), todo: todo, compeleted:false })
        setTodo("")
    }
    return (
        <form
            onSubmit={handelSubmit}
            className="flex">
            <input
                type="text"
                placeholder="Write Your Todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-8 py-1 bg-[#EDA415] text-white shrink-0">
                Add
            </button>
        </form>
    )
}
