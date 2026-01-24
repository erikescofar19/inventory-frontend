import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Productos</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
