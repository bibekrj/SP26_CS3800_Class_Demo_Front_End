import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(loginData) {
    console.log("printing from handle login", loginData.token);
    setToken(loginData.token);
    setUser(loginData.user);
    setIsLoggedIn(true);
    setCurrentPage("home");
  }

  function handleLogout() {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage("home");
  }

  function renderPage() {
    if (currentPage === "home")
      return <Home user={user} isLoggedIn={isLoggedIn} />;
    if (currentPage === "todos") {
      if (!isLoggedIn) {
        return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
      }
      return <Todos token={token} user={user} />;
    }
    if (currentPage === "about") return <About />;
    if (currentPage === "login")
      return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
    if (currentPage === "register")
      return <Register onNavigate={setCurrentPage} />;
    return <Home user={user} isLoggedIn={isLoggedIn} />;
  }

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <main className="content">{renderPage()}</main>
    </div>
  );
}
