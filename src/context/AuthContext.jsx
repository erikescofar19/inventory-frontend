import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ======================
  // LOGIN
  // ======================
  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    setToken(res.data.token);
    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ======================
  // SINCRONIZAR SESIÓN
  // ======================
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin", // 🔥 CLAVE
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
