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
  const [prompt, setPrompt] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [category, setCategory] = useState(null)


  useEffect(() => {
    // fetch user's list
    setCategories(["Business", "Education", "Fitness"])
    getData();
    // set it to current todo state
  }, [])

  useEffect(() => {

    

  }, [todos])


  console.log(todos)

  function getData(){
    fetch('http://localhost:9292/todos')
    .then((r) => r.json())
    .then((res) => setTodos(res))
  }

  const addTodo = (text) => {
    let id = 1;
    if(todos.length > 0){
     // id = todos[0].id + 1
      id = todos[todos.length - 1].id + 1
    }
    let todo = {id: id, text: text, completed: false, important: false, category: ""}

    setTodos([...todos, todo])
    debugger

    fetch('http://localhost:9292/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                task: text,
            }),
        })
        .then((r) => r.json())
        .then((task) => {
          console.log(task)
          setTodos([...todos, todo])
        
        })

  }

  let num = 1

  const giveCategory = (id) => {


    const categoryInfo = {
      task_id: category
    }

    // fetch update
    setSelectedTodo(id)
    console.log('click!')
    console.log(id)
    console.log(selectedTodo)

    // for update method
    // fetch patch request
    // push body data to whatever grabbed id was
    // profit
    fetch(`http://localhost:9292/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
        .then((r) => r.json())
        .then((task) => console.log(task))
    

    setPrompt(true);
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

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const importantTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.important = !todo.important
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  

  return (
    <div className="main-todo">
      <Popup prompt={prompt} setPrompt={setPrompt}/>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} category={category} categories={categories} setCategory={setCategory}/>
      <hr className='separator'/>
      {todos.map((todo) => {
        return (
          <TodoItem removeTodo={removeTodo} completeTodo={completeTodo} giveCategory={giveCategory} todo={todo} key={todo.id}/>
        )
      })}
      
    </div>
  );
}

export default App;
