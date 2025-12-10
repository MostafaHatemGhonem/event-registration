import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

import type { User } from "../../types";

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginProps {
  setUser: (user: User) => void;
}

function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<LoginResponse>("/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);

      console.log("Login success!", res.data);

      navigate("/admin");

    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
