import { useState, useEffect } from "react";
import api from "../src/api/axios";

export default function Cart() {
    const userId = localStorage.getItem("userId");

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🟢 Load Cart Data
    const loadCartData = async () => {
        if (!userId) {
            setCartItems([]);
            setLoading(false);
            return;
        }

        try {
            const response = await api.get(`/cart/${userId}`);
            console.log("Cart API:", response.data);

            setCartItems(response.data.cart?.items || []);
        } catch (error) {
            console.log("Fetch Error:", error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCartData();
    }, []);

    // 🔴 REMOVE ITEM (DELETE)
    const removeItem = async (productId) => {
        try {
            await api.delete(`/cart/remove`, {
                data: { userId, productId },
            });

            await loadCartData();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            console.log("Remove Error:", err);
        }
    };

    // 🟡 UPDATE QTY (PUT)
    const updateQty = async (productId, quantity) => {
        try {
            if (quantity <= 0) {
                await removeItem(productId);
                return;
            }

            await api.put(`/cart/update`, {
                userId,
                productId,
                quantity,
            });

            await loadCartData();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            console.log("Update Error:", err);
        }
    };

    // ⏳ Loading
    if (loading) {
        return <div className="p-6 text-xl">Loading...</div>;
    }

    // 🛒 Empty Cart
    if (cartItems.length === 0) {
        return <div className="p-6 text-xl">🛒 Your cart is empty</div>;
    }

    // 💰 Total Price
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + (item.productId?.price || 0) * item.quantity,
        0
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.productId?._id}
                        className="flex items-center justify-between border p-4 rounded-lg shadow"
                    >
                        {/* IMAGE */}
                        <img
                            src={item.productId?.imageUrl}
                            alt={item.productId?.title}
                            className="w-20 h-20 object-cover rounded"
                        />

                        {/* DETAILS */}
                        <div className="flex-1 ml-4">
                            <h3 className="font-semibold">
                                {item.productId?.title}
                            </h3>
                            <p>₹{item.productId?.price}</p>

                            {/* QTY CONTROLS */}
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={() =>
                                        updateQty(
                                            item.productId._id,
                                            item.quantity - 1
                                        )
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded"
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        updateQty(
                                            item.productId._id,
                                            item.quantity + 1
                                        )
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="font-semibold">
                            ₹
                            {(
                                (item.productId?.price || 0) * item.quantity
                            ).toFixed(2)}
                        </div>

                        {/* REMOVE */}
                        <button
                            onClick={() =>
                                removeItem(item.productId._id)
                            }
                            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* TOTAL */}
            <h3 className="text-xl font-bold mt-6">
                Total: ₹{totalPrice.toFixed(2)}
            </h3>
        </div>
    );
}