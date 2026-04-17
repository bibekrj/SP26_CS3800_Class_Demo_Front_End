import { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;

export default function Login({ onNavigate, onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");
      setMessage("");
      // console.log(formData);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "this Login Failed");
      }
   
      setMessage("Login Successful");
      // console.log("This is token line", data.token);
      // console.log("This is user",data.user);
      onLogin({
        token: data.token,
        user: data.user
      })
      console.log("About to redirect");
      onNavigate("todos");
    } catch (err) {
      setError(err.message || "Something went wrong during Login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* <button type="submit" disabled="{isSubmitting}">{isSubmitting ? "Logging In...": "Login"}</button> */}
        <button type="submit">
          {isSubmitting ? "Logging In..." : "Login"}
        </button>
      </form>

      <div className="auth-links">
        <button type="button" className="link-button" onClick={() => onNavigate("forgotPassword")}> Forgot Password</button>
        <button type="button" className="link-button" onClick={() => onNavigate("resetPassword")}> Reset Password</button>

        <button type="button" className="link-button" onClick={() => onNavigate("register")}> Need an Account? Register</button>
      </div>

      

      {message && <p className="success">{message}</p>}
      {error && <p className="error">Error: {error}</p>}
    </section>
  );
}
