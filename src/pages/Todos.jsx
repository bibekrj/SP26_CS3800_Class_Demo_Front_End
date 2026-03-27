import { useEffect, useState } from "react";
const API_URL = "http://localhost:3000/api/admin/todos";

// CONST API_URL2 = "api/admin/todos"


export default function Todos(){
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchTodos(){
            try{
                setLoading(true);
                setError("");
                const response = await fetch(API_URL);
                console.log(response)
                if (!response.ok){
                    throw new Error("Failed to fetch todos");
                }
                const data = await response.json();
                console.log(data.todos)
                setTodos(data.todos);
            }catch(error){
                setError(error.message || "Something went wrong");
            }finally{
                setLoading(false);
            }  
        }
        fetchTodos();
    }, []);
    return(
        <section>
            <h2>Todos </h2>
            {loading && <p>Loading todos... </p>}
            {error && <p> Error: {error}</p>}

            {!loading && !error && todos.length===0  && <p>No todos found</p>}

            {!loading && !error && todos.length >0 && (
                <ul>
                    {todos.map((todo) =>(
                        <li key={todo.task_id}>
                            <strong>{todo.tasks}</strong> {" "}
                            {todo.completed ? "(Completed)": "(Not Completed)"}
                        </li>
                    ))}
                </ul>
            )}
            

        </section>
        


    );
}