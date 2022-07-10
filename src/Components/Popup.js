
import { useEffect, useState } from 'react';
import './popup.css'

function Popup({ setCategory, editTodo, editState, setEditState, selectedTodo, setTodo, onChangeForm, category, categories }){

    const {task, task_id, id} = selectedTodo
    const [text, setText] = useState("")

    useEffect(() => {
        setText(task)
    }, [])

    function handleClose(e){
        e.preventDefault();
        console.log(selectedTodo)
        if(id === undefined) return null;
        console.log(id)
        fetch(`http://localhost:9292/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task: text,
            task_id: category
        }),
        })
        .then((r) => r.json())
        .then(editTodo(selectedTodo))
        .then(setTodo(null))
        .then(setText(""))

        console.log(selectedTodo)
        setEditState(false)
    }

    function handleInputChange(event) {
        console.log(event.target.value)
        setText(event.target.value)
        onChangeForm(event.target.name, text);
    }

    const categoryList = categories.map((c) => {

        return (
           <option value={c.category_name} key={c.id}>{c.category_name}</option>
        )
    })

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

    return (editState) ? (

        <div className="popup">
            <h1 className='popup-title'>Edit your Todo!</h1>
            <div className="popup-inner">
                <form className='edit-form' onSubmit={handleClose}>
                    <div className='task-header'>
                        <header className='task-pop'>Task:</header>
                        <input type="text" onChange={handleInputChange} value={text} className="task-input" />
                    </div>
                    <div className='category-header'>
                        <select className="select-box" onChange={(event) => grabCategory(event)}>{categoryList}</select>
                    </div>
                    <button type='submit' className="close-btn">Close</button>
                </form>
            </div>
        </div>


    ) : "";


}

export default Popup;