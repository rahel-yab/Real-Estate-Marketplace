import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "../../../backend/controllers/auth.controller";
import { set } from "mongoose";

export default function SignUp() {
  const { formData, setFormData } = React.useState({});
  const { error, setError } = React.useState(null);
  const { loading, setLoading } = React.useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg bg-gray-100 p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-md mx-auto"
      >
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id='password"'
        />

        <button
          disabled={loading}
          className="bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 mt-5 ml-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">(error)</p>}
    </div>
  );
}
