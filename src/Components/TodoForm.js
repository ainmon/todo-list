import { useState } from "react"
import Popup from "./Popup";


function TodoForm({ addTodo, setSelectedTodo, category, setCategory, categories, selectedTodo, onChangeForm, handleCategoryChange, editTodo, todo}) {

    const [text, setText] = useState("");

    function findID(c){
        categories.map((z) => {
            console.log(c.target.value)
            console.log(z)
            if(c.target.value === z.category_name)
            setCategory(z.id)
            else console.log('category not found')
        })
        return null;
    }

    function grabCategory(e){
        findID(e)
        console.log(category)
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
    

     const categoryList = categories.map((c) => {

         return (
            <option value={c.category_name} key={c.id}>{c.category_name}</option>
         )
     })


    
    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" name="task" value={task} onChange={(e) => setText(e.target.value)} className="todo-text" placeholder="Create a new task!" />
            <button type="submit" className="todo-btn">Add Todo!</button>
            <select className="select-box" onChange={(event) => grabCategory(event)}>{categoryList}</select>
        </form>
        </>
    )

}

export default TodoForm;