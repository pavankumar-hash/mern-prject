import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../src/api/axios";
const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}`)
    setProduct(res.data);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      loadProducts();
    }, 500); // 500ms wait

    return () => clearTimeout(delay);
  }, [search, category]);

  const addtoCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }
    const res = await api.post(`/cart/add`, { userId, productId });
    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0);
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Item added to cart");
  }
  return (
    <>
      <div className="p-6">
        {/* Filters */}
        <div className="mb-4 flex gap-3 flex-col md:flex-row">
          <input
            placeholder="search products.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Products</option>
            <option value="Electronics">Electronics</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {product.map((product) => (
            <div
              key={product._id}
              className="border rounded p-3 flex flex-col justify-between hover:shadow transition"
            >
              {/* CLICKABLE AREA */}
              <Link to={`/product/${product._id}`} className="flex flex-col items-center">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-2"
                />
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-gray-600">₹{product.price}</p>
              </Link>

              {/* BUTTON (CARD KE ANDAR HI HAI) */}
              <button
                onClick={() => addtoCart(product._id)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-500 active:scale-95 transition"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default Home;
