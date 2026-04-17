import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }
  )

  function handleLogin(loginData) {
    console.log("printing from handle login", loginData.token);
    setToken(loginData.token);
    setUser(loginData.user);
    setIsLoggedIn(true);

    localStorage.setItem("token", loginData.token);
    localStorage.setItem("user", JSON.stringify(loginData.user));
    setCurrentPage("home");
  }

  function handleLogout() {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    if (currentPage === "forgotPassword") 
      return <ForgotPassword onNavigate={setCurrentPage} />
    if (currentPage ==="resetPassword")
      return <ResetPassword onNavigate={setCurrentPage}/>
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
