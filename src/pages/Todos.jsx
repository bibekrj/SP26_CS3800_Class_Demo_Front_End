import { useEffect, useState } from "react";
const API_URL = "https://localhost:3000//api/admin/todos"

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
                if (!response.ok){
                    throw new Error("Failed to fetch todos");
                }
                const data = await response.json();
                setTodos(data);
            }catch(error){
                setError(error.message || "Something went wrong");
            }finally{
                setLoading(false);
            }  
        }
        fetchTodos();
    }, []);
    return(

    )
}