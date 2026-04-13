import { useEffect, useState } from "react";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`;

// CONST API_URL2 = "api/admin/todos"

//Used ChatGPT  to debug the function.
// Originally, the function was missing curly braces to parse the token object
// Backend, on login, return data object which comes wih token + user details and needs to be parsed separately to get token
// Todo Function is responsible for loading creating todos
export default function Todos({ token, user }) {
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
      console.log(token);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("the respnse we got", response);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.log("Error is happening");
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

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tasks: trimmedTask }),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = await response.json();

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTitle("");
      await fetchTodos();
    } catch (err) {
      setError(err.message || "something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggle(id, currentCompleted) {
    try {
      console.log("Trying to print id value");
      console.log(id);
      console.log(currentCompleted);
      setError("");
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to Update Todo");
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.task_id === id) {
            return updatedTodo;
          }

          return todo;
        }),
      );
      await fetchTodos();
    } catch (err) {
      setError(err.message || "something went wrong while toggling");
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete TODo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.task_id !== id));
      await fetchTodos();
    } catch (err) {
      setError(err.message || "Something went wrong");
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
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Todo"}
        </button>
      </form>
      {loading && <p>Loading todos... </p>}
      {error && <p className="error"> Error: {error}</p>}

      {!loading && !error && todos.length === 0 && <p>No todos found</p>}

      {!loading && !error && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.task_id} className="todo-item">
              {/* <strong>{todo.tasks}</strong>{" "}
              {todo.completed ? "(Completed)" : "(Not Completed)"} */}
              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => handleToggle(todo.task_id, todo.completed)}
              >
                {todo.tasks}
              </span>
              <div className="todo-actions">
                <button
                  type="button"
                  onClick={() => handleToggle(todo.task_id, todo.completed)}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(todo.task_id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
