export default function NavBar({ currentPage, onNavigate}){
    return(
        <nav className="navbar">
            <h1> To Do App </h1>

            <div className="nav-links">
                <button className={currentPage === "home" ? "active" : ""}  onClick={()=> onNavigate("home")}>Home</button>
                <button className={currentPage === "todos" ? "active" : ""} onClick={()=> onNavigate("todos")}>To Do</button>
                <button className={currentPage === "about" ? "active" : ""} onClick={()=> onNavigate("about")}>About</button>      
                <button className={currentPage === "logout" ? "active" : ""} onClick={()=> onNavigate("logout")}>Log Out</button>      
            </div>

        </nav>

        // C:\Users\Bibek\Desktop\todo_frontend_class_demo\src\App.css
    )
}