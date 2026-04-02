import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", formData);
      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 text-sm font-medium capitalize text-gray-600">
                {key}
              </label>

              <input
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
