

function TodoItem({props}){

    const { todo, removeTodo, completeTodo, importantTodo} = props

    return (
        <div className={todo.completed ? "todo-row-true" : "todo-row"} style={todo.important ? {background: "orange"} : {}}>
            {todo.text}
            <div className="btn-container">
                <button onClick={() => importantTodo(todo.id)} className="important-btn">Check</button>
            </div>
        </div>
    )

}