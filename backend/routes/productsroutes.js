import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Create product
router.post("/add", createProduct);

// Get all products
router.get("/", getProduct);
router.get("/:id", getProductById);
// Update product
router.put("/update/:id", updateProduct);
// Delete product
router.delete("/delete/:id", deleteProduct);
export default router;
