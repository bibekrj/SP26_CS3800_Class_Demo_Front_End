export default function NavBar({ currentPage, onNavigate}){
    return(
        <nav className="navbar">
            <h1> To Do App </h1>

            <div className="nav-links">
                <button className={currentPage === "home" ? "active" : ""}  onClick={()=> onNavigate("home")}>Home</button>
                <button className={currentPage === "todos" ? "active" : ""} onClick={()=> onNavigate("todos")}>ToDo</button>
                <button className={currentPage === "about" ? "active" : ""} onClick={()=> onNavigate("about")}>About</button>      
            </div>

        </nav>
    )
}