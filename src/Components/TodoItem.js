import { RiCloseCircleLine } from "react-icons/ri"
import { BiCheckCircle } from "react-icons/bi"

function TodoItem({ todo, removeTodo, completeTodo, giveCategory}){




    return (
        <div className={todo.completed ? "todo-row-true" : "todo-row"} style={todo.important ? {background: "orange"} : {}}>
            {todo.task}
            {todo.category}
            <div className="btn-container">
                <button onClick={() => giveCategory(todo.id)} className="important-btn">C</button>
                <RiCloseCircleLine style={{ marginRight: 5}} onClick={() => removeTodo(todo.id)}/>
                <BiCheckCircle onClick={() => completeTodo(todo.id)}/>
            </div>
        </div>
    )

}

export default TodoItem;