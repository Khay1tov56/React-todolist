import React from 'react';
import { useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main.css"

function App() {
  const title = useRef();
  const [value, setValue] = useState ("")
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  const deleteTodo = (id) => {
    const newTodo = todos.filter(item => item.id !== id);
    setTodos(newTodo)
    console.log(newTodo);
    toast.error("Todo o'chirildi");
  };

  function editTodo(id) {
    const newArr = [...todos]
    const item = newArr.find(item => item.id === id);
    const text = prompt("edit todo", item.text);
    toast.done("Todo qayta yangilandi");

    setTodos(newArr);
  };

  function checkBox (id) {
    const newTodoCheck = [...todos]
    let newCheck = newTodoCheck.find(item => item.id === id);
    newCheck.isComplete = !newCheck.isComplete;

    setTodos(newTodoCheck)

    toast.warning("Todo bajarildi");

  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
   
    if(value.length === 0) {
      alert("Please text writing todo");
      return;
    }
    const newTodo = {
     
      id: Math.random(),
      text:value,
      isComplete: false,
    };
    setTodos(prev => {
      return [...todos, newTodo]
    });
    setValue ("")
  }

	localStorage.setItem('todos', JSON.stringify(todos));


  return (
    <div className="App">
      <div className="container">
      <h1 className="text-center text-warning">TodoList</h1>
    <form className="w-50 mx-auto my-5 d-flex" onSubmit={handleFormSubmit}>
      <input className="form-control" ref={title} value={value} type="text" placeholder="Writing..." onChange={(evt) => setValue(evt.target.value)}/>
      <button className="btn btn-success ms-4" type="submit" onClick={() => {
        console.log(title.current.value)
      }}>Send</button>
    </form>
    <ul>
      {
        todos.map(todo => <li key={todo.id} className="d-flex justify-content-between align-items-center w-50 mx-auto my-3 bg-success p-4 rounded-3">
          <input className='form-check-input' defaultChecked={todo.isComplete} onClick={() => checkBox(todo.id)} type="checkbox" />
          <p className='m-0 texttodo text-white fw-bold' style={{textDecoration: todo.isComplete ? "line-through" : "none"}}>{todo.text}</p>
          <div className="wrap">
          <button className='btn btn-warning me-3 fw-bold' onClick={() => editTodo(todo.id)}>Edit</button>
          <button className='btn btn-danger fw-bold' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>)
      }
    </ul>
      </div>
      <ToastContainer
				position='top-right'
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
    </div>
  );
}

export default App;
