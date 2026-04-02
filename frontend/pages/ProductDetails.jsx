import { useState, useEffect } from "react";
import api from "../src/api/axios";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* Left Side - Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl shadow"
          />
        </div>

        {/* Right Side - Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;