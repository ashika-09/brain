import React, { useRef, useState } from "react";
import Button from "../Dashboard Components/Button";
import axios from "axios";
import { BACKEND_URL } from '../../config';
import { useNavigate } from "react-router";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setloading(true); // Set loading to true before making the request
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        name,
        username,
        email,
        password,
      });

      alert(res.data.message); // Show success message
      navigate("/login")
    }catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      alert(errorMessage); // Show error message
    }finally {
      setloading(false); // Set loading to false after request completion
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-lg outline outline-1 outline-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              className="w-full px-4 py-2 mt-1 bg-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button 
            text={loading?"Signing Up...":"Sign Up"}
            type="submit"
            disabled={loading} 
            variant={`${
              loading ? "bg-[#181362] cursor-not-allowed opacity-60 cursor-default" : "bg-purple-700 hover:bg-purple-600"
            } py-2 justify-center transition`}
          />
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
