"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend API'ye istek
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      // Kullanıcı token alırsa, bu token localStorage'a kaydedilir ve kullanıcı yönlendirilir
      localStorage.setItem("token", data.token);
      // Örneğin ana sayfaya yönlendirme
      window.location.href = "/";
    } else {
      // Hata durumunda mesaj gösterme
      alert("Giriş bilgileri yanlış");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="p-10 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 max-sm:w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-5 text-center text-slate-700">
          Log In
        </h2>
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-slate-700"
          />
        </div>
        <div className="mb-4">
          <label className="pl-1 text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-slate-700"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded  bg-slate-400 hover:bg-slate-700 text-white font-bold"
        >
          Log In
        </button>
      </form>
      {/*navigation buttons*/ }
      <div className="flex w-3/4 pt-2 gap-4 max-sm:flex-col max-sm:w-full max-sm:gap-2">
        <Link
          href="/"
          className="px-10 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 text-slate-700 text-3xl flex items-center justify-evenly max-sm:w-full max-sm:text-2xl max-sm:p-2 "
        >
          
          <Image src="/home.svg" alt="home" width={40} height={40} />
          <p>Go home</p>
        </Link>
        <Link
          href="/register"
          className="px-10 py-4 bg-white bg-opacity-75 rounded-lg shadow-2xl w-1/2 text-slate-700 text-3xl flex items-center justify-evenly max-sm:w-full max-sm:text-2xl max-sm:p-2"
        >
          
          <Image src="/register.svg" alt="home" width={40} height={40} />
          <p>Go register</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
