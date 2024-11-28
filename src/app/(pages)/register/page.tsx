"use client";

import Link from "next/link";
import { useState } from "react";

const Register = () => {
  // Kullanıcıdan aldığımız verileri saklamak için useState hook'unu kullanıyoruz.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // Hata mesajlarını saklamak için bir state.
  const [success, setSuccess] = useState(false); // Başarılı kayıt durumunu saklamak için bir state.

  // Formdaki değişiklikleri yönetmek için bir fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Form gönderildiğinde çağrılan fonksiyon
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller.

    // Şifre doğrulaması
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // API'ye istek atma (kullanıcı kaydı için)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      } else {
        setSuccess(true);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setError("Failed to register. Please reload page and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form
        className="p-10 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 max-sm:w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-5 text-center text-slate-700">Register</h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-center mb-4">
            Registration successful! You can now log in.
          </p>
        )}

        {/* Kullanıcı adı */}
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-slate-700"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-slate-700"
            required
          />
        </div>

        {/* Şifre */}
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded text-slate-700"
            required
          />
        </div>

        {/* Şifre Onayı */}
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded text-slate-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded  bg-slate-400 hover:bg-slate-700 text-white font-bold"
        >
          Register
        </button>
      </form>
      {/*navigation buttons*/ }
      <div className="flex w-3/4 pt-2 gap-4 max-sm:flex-col max-sm:w-full max-sm:gap-2">
        <Link
          href="/"
          className="px-10 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 text-slate-700 text-3xl flex items-center justify-evenly max-sm:w-full max-sm:text-2xl max-sm:p-2 "
        >
          
          <img src="/home.svg" alt="home" width={40} height={40} />
          <p>Go home</p>
        </Link>
        <Link
          href="/login"
          className="px-10 py-4 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 text-slate-700 text-3xl flex items-center justify-evenly max-sm:w-full max-sm:text-2xl max-sm:p-2"
        >
          
          <img src="/register.svg" alt="home" width={40} height={40} />
          <p>Go log in</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
