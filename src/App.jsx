import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import About from "./pages/About";



export default function App(){
  const [currentPage, setCurrentPage] = useState("home");

  function renderPage(){
    if (currentPage === "home") return <Home />;
    if (currentPage === "todos") return <Todos />;
    if (currentPage === "about") return <About />;
    return <Home />;

  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage}/>
      <main className="content">{renderPage()}</main>
    </div>
  );

}