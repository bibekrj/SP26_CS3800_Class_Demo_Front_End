import { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`;

export default function ResetPassword({ onNavigate }) {
    const [formData, setFormData] = useState({
        email: "",
        resetToken: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.email.trim() || !formData.resetToken.trim() || !formData.newPassword.trim()) {
            setError("All fields are required");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Password do not match");
            return;
        }
        try {
            setIsSubmitting(false);
            setError("");
            setMessage("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    token: formData.resetToken.trim(),
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "failed to reset password");
            }
            setMessage(data.message || "password reset successful");

            setFormData({
                email: "",
                resetToken: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (err) {
            setError(err.message || "something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="auth-card">

            <h2>Reset password</h2>
            <p className="subtext">
                ENter the reset token and choose a new password
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="reset-email">Email</label>
                <input
                    id="reset-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange} />

                <label htmlFor="reset-token"> Reset Token/Code</label>

                <input
                    id="reset-token"
                    type="text"
                    name="resetToken"
                    placeholder="Enter your reset token"
                    value={formData.resetToken}
                    onChange={handleChange} />

                <label htmlFor="new-password"> New Password</label>
                <input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange} />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange} />

                <button type="submit">
                    {isSubmitting ? "Resetting..." : "Reset Password"}
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
    )
}
