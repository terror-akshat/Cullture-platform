import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../config";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(api.login(), formData);

      // Save token and user info to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to home
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full card p-8 animate-fade-up">
        {/* Title */}

        <h1 className="text-3xl font-bold text-center text-amber-100 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-slate-300 mb-8">
          Sign in to your account
        </p>

        {/* Error */}

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}

          <div>
            <label className="block text-sm font-semibold text-amber-100 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="input-field"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-semibold text-amber-100 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              required
              className="input-field"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}

        <p className="text-center mt-6 text-slate-300">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-amber-300 font-semibold hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
