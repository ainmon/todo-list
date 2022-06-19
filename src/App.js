import './App.css';
import { useEffect, useState } from 'react';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import Popup from './Components/Popup';


function App() {


  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([])
  const [editState, setEditState] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [category, setCategory] = useState(null)
  const [submitAction, setSubmitAction] = useState(false)




  useEffect(() => {
    // fetch user's list
    fetchCat();
    getData();
    console.log(selectedTodo)
    console.log(todos)
    console.log(categories)
    // set it to current todo state
    //setting dependancy to selectedTodo will update list in real time but is causing an issue with popup info being loaded correctly
    //submitAction will be essentially a tool to force a refresh anytime a request is made to the backend
  }, [submitAction])

  function handleRefresh(){
    setSubmitAction(!submitAction)
  }

  function getData(){
    fetch('http://localhost:9292/todos')
    .then((r) => r.json())
    .then((res) => setTodos(res))
  }

  function fetchCat(){
    fetch('http://localhost:9292/categories')
    .then((r) => r.json())
    .then((res) => setCategories(res))
  }


  const addTodo = (text) => {
    let id = 1;
    if(todos.length > 0){
     // id = todos[0].id + 1
      id = todos[0].id + 1
    }
    let todo = {id: id, text: text, completed: false, category: "", task_id: category}

    let newTodos = [...todos, todo]
    console.log(newTodos)
    setTodos(newTodos)

    fetch('http://localhost:9292/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: text,
                task_id: category
            }),
        })
        .then((r) => r.json())
        .then((task) => {
          console.log(task)
          setTodos([...todos, todo])
          handleRefresh();
        })

  }

  const removeTodo = (id) => {

    fetch(`http://localhost:9292/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        })

    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  


  function handleChangeForm(name, value, task_id, category_id) {
    console.log(name, value)
    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
      [task_id]: category_id,
    });
  }

  function editTodo(updatedTodo){

    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo)

    setSelectedTodo(updatedTodo)
    setTodos(updatedTodos)
    handleRefresh();
  }

  

  return (
    <div className="main-todo">
      {editState ? <Popup setTodo={setSelectedTodo} setCategory={setCategory} editTodo={editTodo} editState={editState} setEditState={setEditState} selectedTodo={selectedTodo} onChangeForm={handleChangeForm} category={category} categories={categories}/> : null}
      <h1>Todo List</h1>
      <TodoForm editTodo={editTodo} addTodo={addTodo} category={category} categories={categories} setCategory={setCategory} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} todo={selectedTodo}/>
      <hr className='separator'/>
      {todos.map((todo) => {
        return (
          <TodoItem setCategory={setCategory} category={category} removeTodo={removeTodo} editTodo={editTodo} todo={todo} key={todo.id} selectTodo={setSelectedTodo} categories={categories} editState={editState} setEditState={setEditState}/>
        )
      })}
      
    </div>
  );
}

export default App;
