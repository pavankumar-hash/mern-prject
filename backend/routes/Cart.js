import express from "express";
import {
  addtoCart,
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../controllers/CartController.js";

const router = express.Router();

// Add item to cart
router.post("/add", addtoCart);
// Get cart items for a user
router.get("/:userId", getCartItems);
// Remove item from cart
router.delete("/remove", removeFromCart);
// Update item quantity in cart
router.put("/update", updateCartItem);
export default router;
