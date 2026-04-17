import { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`;


export default function ForgotPassword({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Email is required");
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");
            setMessage("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: trimmedEmail })
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "failed to send reset request");
            }

            setMessage(data.message || "Reset instructions sent");
            setEmail("");

        }
        catch (err) {
            setError(err.message || "soemthing went wrong");
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="auth-card">
            <h2>Forgot Password</h2>
            <p className="subtext">
                Enter your email and we will send you the reset instructions
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="forgot-email">Email</label>
                <input
                    id="forgot-email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />

                <button type="submit">
                    {isSubmitting ? "Sending.." : "Send Reset Link"}
                </button>
            </form>

            <div className="auth-links">
                <button type="button" className="link-button" onClick={() => onNavigate("login")}>
                    Back to Login
                </button>
            </div>

            {message && <p className="success"> {message}</p>}
            {error && <p className="error"> Error: {error}</p>}
        </section>
    );
}