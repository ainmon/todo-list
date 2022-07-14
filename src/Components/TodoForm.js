import { useState } from "react"
import Popup from "./Popup";


function TodoForm({ addTodo, setSelectedTodo, setCategory, categories, todo, handleRefresh}) {

    const [text, setText] = useState("");

    function findID(c){
        categories.map((z) => {
            console.log(c.target.value)
            console.log(z)
            if(c.target.value === z.category_name){   
                setCategory(z.id)
                console.log(z.id)
            }
            else console.log('category not found')
        })
        return null;
    }

    function grabCategory(e){
        findID(e)
    }
    
    function handleSubmit(e){
        e.preventDefault();

        // addTodo(todo) causes major issue with text showing up wonky
        console.log(text)
        addTodo(text)
        setSelectedTodo(null)
        handleRefresh();
    }
    

    
    

     const categoryList = categories.map((c) => {

         return (
            <option value={c.category_name} key={c.id}>{c.category_name}</option>
         )
     })


    
    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" name="task" value={todo ? todo.task : null} onChange={(e) => setText(e.target.value)} className="todo-text" placeholder="Create a new task!" />
            <button type="submit" className="todo-btn">Add Todo!</button>
            <select className="select-box" onChange={(event) => grabCategory(event)}>{categoryList}</select>
        </form>
        </>
    )

}

export default TodoForm;