import { useState } from "react"


function TodoForm({addTodo, category, categories, setCategory}) {

    const [text, setText] = useState("");

    const categoryList = categories.map((c) => {
        return (
            <option value={c} key={c.id}>{c}</option>
        )
    })

    function handleSubmit(e){
        e.preventDefault();

        addTodo(text)
        // setText("")
    }

    function handleChange(e){
        setCategory(e.target.value)
        // change state of current form obj id to category id
        console.log(category)
    }



    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input value={text} onChange={(e) => setText(e.target.value)} className="todo-text" placeholder="Create a new task!" />
            <button type="submit" className="todo-btn">Add Todo!</button>
            <select name="category" value={category} onChange={handleChange} className="category-list">
                {categoryList}
            </select>
        </form>
    )

}

export default TodoForm;