import { useState } from "react"


function TodoForm({props}) {

    const [text, setText] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        props.addTodo(text)
        setText("")
    }



    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input value={text} onChange={(e) => setText(e.target.value)} className="todo-text" placeholder="Create a new task!" />
            <button type="submit" className="todo-btn">Add Todo!</button>
        </form>
    )

}

export default TodoForm;