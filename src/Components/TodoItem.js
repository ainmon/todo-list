import { RiCloseCircleLine } from "react-icons/ri"
import { BiCheckCircle } from "react-icons/bi"

function TodoItem({ setPrompt, todo, removeTodo, category, setCategory, selectTodo, categories, editState, setEditState}){

    const {task, task_id, id} = todo;

    function handleClick(){
        console.log(editState)
        setEditState(true)
        selectTodo(todo)
        setCategory(todo.task_id)
        console.log(todo)
    }

    const findCategory = categories.map((c) => {
        if(c.id === task_id){
            console.log(c.category_name)
            return <p>
                {c.category_name}
            </p>
        }
    })

    //task_id === cat.id ? "string of matching category" : "No Category"


    return (
        <div className={todo.completed ? "todo-row-true" : "todo-row"} style={todo.important ? {background: "orange"} : {}}>
            {todo.task === "" ? "No Name Given" : todo.task}
            {todo.category}
            <span className="category-id">Category: {task_id !== null ? findCategory : "No Category"}</span>
            <div className="btn-container">
                <button onClick={handleClick} className="important-btn">E</button>
                <BiCheckCircle onClick={() => removeTodo(todo.id)}/>
            </div>
        </div>
    )

}

export default TodoItem;