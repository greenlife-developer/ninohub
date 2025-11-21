import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { setUser } from "../redux/slices/userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.user);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Signup validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast.error("Please fill in all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      // For now, just simulate signup (will be connected to backend later)
      const userData = {
        name: formData.name,
        email: formData.email,
      };
      dispatch(setUser(userData));
      toast.success(`Welcome, ${formData.name}! Account created successfully.`);
      navigate(from, { replace: true });
    } else {
      // Login validation
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        return;
      }

      // For now, just simulate login (will be connected to backend later)
      const userData = {
        name: formData.email.split("@")[0],
        email: formData.email,
      };
      dispatch(setUser(userData));
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p>
            {isSignup
              ? "Sign up to start customizing your jewelry"
              : "Login to access your customizations"}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required={isSignup}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required={isSignup}
              />
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="login-toggle">
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
