export default function NavBar({
  currentPage,
  onNavigate,
  isLoggedIn,
  user,
  onLogout,
}) {
  return (
    <nav className="navbar">
      <h1> To Do App </h1>

      <div className="nav-links">
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={currentPage === "todos" ? "active" : ""}
          onClick={() => onNavigate("todos")}
        >
          To Do
        </button>
        <button
          className={currentPage === "about" ? "active" : ""}
          onClick={() => onNavigate("about")}
        >
          About
        </button>
        {!isLoggedIn && (
          <>
            <button
              className={currentPage === "login" ? "active" : ""}
              onClick={() => onNavigate("login")}
            >
              Login
            </button>
            <button
              className={currentPage === "register" ? "active" : ""}
              onClick={() => onNavigate("register")}
            >
              Register
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <span className="welcome-text">
                Welcome, {user?.name || user?.email|| "User"}
                </span>
            <button
              className={currentPage === "logout" ? "active" : ""}
              onClick={onLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>

    // C:\Users\Bibek\Desktop\todo_frontend_class_demo\src\App.css
  );
}
