import React, { useRef, useState } from "react";
import Button from "../Dashboard Components/Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const [loading, setloading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
  
    setloading(true); // Set loading to true before making the request
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        email,
        password,
      });
  
      alert(res.data.message); // Show success message
  
      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
  
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      alert(errorMessage); // Show error message
    } finally {
      setloading(false); // Set loading to false after request completion
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-lg outline outline-1 outline-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button 
            text= {loading? "Loging in....":"Login"}
            type="submit"
            disabled={loading} 
            variant={`${
              loading ? "bg-[#181362] cursor-not-allowed opacity-60 cursor-default" : "bg-purple-700 hover:bg-purple-600"
            } py-2 justify-center transition`}
          />
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
