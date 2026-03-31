import { useEffect, useState } from "react";
const API_URL = "http://localhost:3000/api/todos";

// CONST API_URL2 = "api/admin/todos"

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_URL);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      console.log(data.todos);
      setTodos(data.todos);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTask = title.trim();

    if (!trimmedTask) {
        return;
    }

    try{
        setIsSubmitting(true);
        setError("");

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({tasks: trimmedTask}),
            
        });
        if (!response.ok){
            throw new Error("Failed to create todo")
        }

        const newTodo = await response.json();

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTitle("");
    }
    catch(err){
        setError(err.message || "something went wrong")
    }
    finally{
        setIsSubmitting(false);
    }

  }

  async function handleToggle(id, currentCompleted){
    try{
        setError("");
        const reponse = await fetch(`${API_URL}/${id}/toggle`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({completed: !currentCompleted})
        });

        if (!reponse.ok){
            throw new Error("Failed to Update Todo");
        }

        const updatedTodo = await response.json();


        setTodos((prevTodos)=>
            prevTodos.map((todo) =>{
                if(todo.id === id){
                    return updatedTodo;
                }

                return todo
            })
        );
    }catch(err){
        setError(err.message || "something went wrong while toggling");
    }

  }

  return (
    <section>
      <h2>Todos </h2>

      <form onSubmit={handleSubmit} className="todo-form">
            <input 
            type="text" 
            placeholder="Enter your todo" 
            value={title}
            onChange={(event) => setTitle(event.target.value)} />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding...": "Add Todo"}

            </button>
      </form>
      {loading && <p>Loading todos... </p>}
      {error && <p> Error: {error}</p>}

      {!loading && !error && todos.length === 0 && <p>No todos found</p>}

      {!loading && !error && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.task_id}>
              <strong>{todo.tasks}</strong>{" "}
              {todo.completed ? "(Completed)" : "(Not Completed)"}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
