import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../src/api/axios";

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    // useEffect(() => {
    //     const loadCart = async () => {
    //         try {
    //             if (!userId) {
    //                 setCartCount(0);
    //                 return;
    //             }

    //             const response = await api.get(`/cart/${userId}`);

    //             const total =
    //                 response.data.items?.reduce(
    //                     (sum, item) => sum + item.quantity,
    //                     0
    //                 ) || 0;

    //             setCartCount(total);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     loadCart();

    //     window.addEventListener("cartUpdated", loadCart);
    //     return () => {
    //         window.removeEventListener("cartUpdated", loadCart);
    //     };
    // }, [userId]);

    // 🛒 Load Cart Count
    useEffect(() => {
        const loadCart = async () => {
            try {
                if (!userId) {
                    setCartCount(0);
                    return;
                }

                const response = await api.get(`/cart/${userId}`);

                const total =
                    response.data.cart?.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    ) || 0;

                setCartCount(total);
            } catch (err) {
                console.log("Cart Error:", err);
            }
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, [userId]);

    const logout = () => {
        localStorage.removeItem("userId");
        setCartCount(0);
        navigate("/login");
    };


    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">

            {/* LEFT - LOGO */}
            <div>
                <Link to="/" className="text-2xl font-bold hover:text-cyan-400 transition">
                    My Store
                </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

                {/* CART */}
                <Link to="/cart" className="relative text-xl hover:scale-110 transition">
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* AUTH */}
                {userId ? (
                    <button
                        onClick={logout}
                        className="bg-cyan-500 text-black px-3 py-1 rounded-md font-semibold hover:bg-cyan-400 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-500 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}