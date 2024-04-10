import { useEffect, useState } from "react";
import './App.css'; // Se till att du importerar din CSS-fil
import { useCart } from "./context/CartContext";

interface IProduct {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    default_price: {
        unit_amount: number;
    };
}

export const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartItems, setCartItems] = useState<IProduct[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();

            const productsList: IProduct[] = data.data.map((product: IProduct) => ({
                ...product,
                price: product.default_price.unit_amount / 100 
            }));

            setProducts(productsList);
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    return (
        <div className="products-container">
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}:- </p>
                        {product.images && product.images.map((image, index) => (
                            <img key={index} src={image} alt={product.name} style={{ width: "200px"}} />
                        ))}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default Products;