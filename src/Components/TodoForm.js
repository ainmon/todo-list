import { useState } from "react"
import Popup from "./Popup";


function TodoForm({ addTodo, setSelectedTodo, category, setCategory, categories, selectedTodo, onChangeForm, handleCategoryChange, editTodo, todo}) {

    const [text, setText] = useState("");


    function grabCategory(e){
        setCategory(e)
    }
    
    function handleSubmit(e){
        e.preventDefault();

        // console.log(todo, id)
        // fetch(`http://localhost:9292/todos/${id}`, {
        // method: "PATCH",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(todo),
        // })
        // .then((r) => r.json())
        // .then(editTodo(todo));

        // addTodo(todo) causes major issue with text showing up wonky
        console.log(text)
        addTodo(text)
        setSelectedTodo(null)
        setText("")
    }
    

    if (!todo) return null;

    const {task, task_id, id} = selectedTodo;
    
    const findCategory = categories.map((c) => {
        if(c.id === task_id){
            console.log(c.category_name)
            return <p>
                {c.category_name}
            </p>
        }
    })
    

    // const categoryList = categories.map((c) => {
    //     return (
    //         <option value={c.category_name} key={c.id} onClick={grabCategory}>{c.category_name}</option>
    //     )
    // })


    
    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" name="task" value={task} onChange={(e) => setText(e.target.value)} className="todo-text" placeholder="Create a new task!" />
            <button type="submit" className="todo-btn">Add Todo!</button>
            <input type="text "name="category" value={category}  className="category-list" placeholder="Enter a category"/>
        </form>
        </>
    )

}

export default TodoForm;