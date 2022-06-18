import './App.css';
import { useEffect, useState } from 'react';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';
import Popup from './Components/Popup';
import CategoryMenu from './Components/CategoryMenu';

function App() {

  // need to incorporate fetched list from backend
  // all functions need to include CRUD stuff

  // popup form will handle edit function
  // incorporate edit button on todo


  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([])
  const [editState, setEditState] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [category, setCategory] = useState(null)


  

  useEffect(() => {
    // fetch user's list
    fetchCat();
    getData();
    setSelectedTodo(todos)
    console.log(todos)
    console.log(categories)
    // set it to current todo state
  }, [selectedTodo])


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
    let todo = {id: id, text: text, completed: false, category: ""}

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
            }),
        })
        .then((r) => r.json())
        .then((task) => {
          console.log(task)
          setTodos([...todos, todo])
        
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

  
  


  

  function handleChangeForm(name, value) {
    console.log(name, value)
    setSelectedTodo({
      ...selectedTodo,
      [name]: value,
      //[todo.task_id]: category
    });
  }

  function editTodo(updatedTodo){

    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo)

    setSelectedTodo(updatedTodo)
    setTodos(updatedTodos)
  }

  

  return (
    <div className="main-todo">
      {editState ? <Popup editState={editState} setEditState={setEditState} todo={selectedTodo} onChangeForm={handleChangeForm}/> : null}
      <h1>Todo List</h1>
      <TodoForm editTodo={editTodo} addTodo={addTodo} category={category} categories={categories} setSelectedTodo={setSelectedTodo} setCategory={setCategory} selectedTodo={selectedTodo} todo={selectedTodo}/>
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
