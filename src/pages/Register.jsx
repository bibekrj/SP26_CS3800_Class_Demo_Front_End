import { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

export default function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
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

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      onNavigate("todos");
    } catch (err) {
      setError(err.message || "Something went wrong during regisration");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
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
          placeholder="Enter your pasword"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">
          {isSubmitting ? "Registering..." : "Register"}{" "}
        </button>
      </form>

      <button type="button" onClick={() => onNavigate("login")}>
        Already have an account? Login
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">Error: {error}</p>}
    </section>
  );
}
