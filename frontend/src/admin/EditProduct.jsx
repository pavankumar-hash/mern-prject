import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const allowedFields = ["title", "description", "price", "stock"];
  useEffect(() => {
    const loadProduct = async () => {
      const res = await api.get(`/products/${id}`);
      const product = res.data;
      setForm(product);
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product Update Successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log("Update error", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {allowedFields.map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 text-sm font-medium capitalize text-gray-600">
                {key}
              </label>

              <input
                name={key}
                value={form[key] || ""}
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
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
