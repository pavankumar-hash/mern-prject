import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  const deletedProduct = async (productId) => {
    try {
      await api.delete(`/products/delete/${productId}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>

        <Link
          to="/admin/products/add"
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition text-center"
        >
          + Add New Product
        </Link>
      </div>

      {/* Table Wrapper (Responsive Scroll) */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{product.title}</td>
                <td className="p-3 font-medium">₹{product.price}</td>
                <td className="p-3">{product.stock}</td>

                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/admin/products/update/${product._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deletedProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
