import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// 🔥 IMPORT CSS
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Entrar
        </button>

        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
