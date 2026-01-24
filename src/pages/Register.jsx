import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Registrarse</button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
