import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../src/api/axios";

export default function Navbar() {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadCart = async () => {
            if (userId) return setCartCount(0);
            const response = await api.get(`/cart/${userId}`);
            const total = response.data.item.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            setCartCount(total);
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        }
    }, [userId]);

    const logout = () => {
        localStorage.removeItem("userId");
        setCartCount(0);
        navigate("/login");
    }

    return (

        <nav>
            <Link to="/">My Store</Link>
            <div>
                <Link to="/cart">Cart Logo
                    {
                        cartCount > 0 && <span className="cart-count">{cartCount}</span>
                    }</Link>
                {userId ? (
                    <>
                        l<Link to="/login">Login</Link>
                        l<Link to="/signup">SignUp</Link>

                    </>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    )
        ;
}