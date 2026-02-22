import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";
import {
  createStockMovement,
  getStockMovements,
} from "../api/stockMovements";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState("all");

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    minStock: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ======================
  // CARGAR PRODUCTOS
  // ======================
  const loadProducts = async () => {
    try {
      const data = await getProducts(); // ✅ ya devuelve el array
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error al cargar productos", error);
      if (error.response?.status === 401) logout();
      setProducts([]); // blindaje anti-crash
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CARGAR MOVIMIENTOS
  // ======================
  const loadMovements = async (productId = null) => {
    try {
      const data = await getStockMovements(productId); // ✅ ya devuelve el array
      setMovements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error al cargar movimientos", error);
      if (error.response?.status === 401) logout();
      setMovements([]); // blindaje anti-crash
    } finally {
      setLoadingMovements(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadMovements();
  }, []);

  // ======================
  // HANDLERS
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      minStock: product.minStock,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("❌ Error eliminando producto", error);
      if (error.response?.status === 401) logout();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;

    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        minStock: Number(form.minStock),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setEditingId(null);
      } else {
        await createProduct(payload);
      }

      setForm({ name: "", price: "", stock: "", minStock: "" });
      loadProducts();
    } catch (error) {
      console.error("❌ Error guardando producto", error);
      if (error.response?.status === 401) logout();
    }
  };

  // ======================
  // MOVIMIENTOS
  // ======================
  const handleStockMovement = async (productId, type) => {
    const quantity = prompt(
      `Cantidad para ${type === "in" ? "ENTRADA" : "SALIDA"}`
    );
    if (!quantity || Number(quantity) <= 0) return;

    const note = prompt("Nota / motivo (opcional)") || "";

    try {
      await createStockMovement({
        product: productId,
        type,
        quantity: Number(quantity),
        note,
      });

      loadProducts();
      loadMovements(selectedProduct === "all" ? null : selectedProduct);
    } catch (error) {
      alert(error.response?.data?.message || "Error en movimiento");
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard de Inventarios</h1>

      <button
        className="btn-danger"
        onClick={logout}
        style={{ float: "right" }}
      >
        Cerrar sesión
      </button>

      <hr />

      <h2>{editingId ? "Editar producto" : "Crear producto"}</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock inicial"
          value={form.stock}
          onChange={handleChange}
        />
        <input
          name="minStock"
          type="number"
          placeholder="Stock mínimo"
          value={form.minStock}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <hr />

      <h2>Productos</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="product-list">
          {Array.isArray(products) &&
            products.map((product) => (
              <li
                key={product._id}
                className={`product-item ${
                  product.stock <= product.minStock ? "low-stock" : ""
                }`}
              >
                <strong>{product.name}</strong> — ${product.price} — Stock:{" "}
                {product.stock} / Mín: {product.minStock}

                {product.stock <= product.minStock && (
                  <strong style={{ color: "red" }}> ⚠ Stock bajo</strong>
                )}

                <div style={{ marginTop: "8px" }}>
                  <button
                    className="btn-warning"
                    onClick={() => startEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn-success"
                    onClick={() =>
                      handleStockMovement(product._id, "in")
                    }
                  >
                    ➕ Entrada
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() =>
                      handleStockMovement(product._id, "out")
                    }
                  >
                    ➖ Salida
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}

      <hr />

      <h2>Historial de movimientos</h2>

      <div className="filter">
        <label>Filtrar por producto: </label>
        <select
          value={selectedProduct}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedProduct(value);
            loadMovements(value === "all" ? null : value);
          }}
        >
          <option value="all">Todos</option>
          {Array.isArray(products) &&
            products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
        </select>
      </div>

      {loadingMovements ? (
        <p>Cargando movimientos...</p>
      ) : movements.length === 0 ? (
        <p>No hay movimientos registrados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Usuario</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(movements) &&
              movements.map((m) => (
                <tr key={m._id}>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                  <td>{m.product?.name}</td>
                  <td style={{ color: m.type === "in" ? "green" : "red" }}>
                    {m.type === "in" ? "Entrada" : "Salida"}
                  </td>
                  <td>{m.quantity}</td>
                  <td>{m.user?.name || m.user?.email}</td>
                  <td>{m.note || "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
