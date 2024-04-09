import { useCart } from "./context/CartContext";
import "./payment.css";




const Payment = ({user}) => {
  const {cart, addToCart, removeFromCart} = useCart();

  const handlePayment = async () => {
    if (!user) {
      alert("Du måste vara inloggad för att kunna köpa.");
      return;
    }
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
        credentials: "include",
      })


    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <div className="shopping-cart">
      <h2>Din kundkorg</h2>
      <ul>
        {cart.map((item) => (
          <li className="product-item" key={item.product.id}>
            <div className="product-details">
              <img
                className="product-image"
                src={item.product.images[0]}
                alt={item.product.name}
              />
              <div className="product-name">{item.product.name}</div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => removeFromCart(item.product.id)}>-</button>
              <div className="product-quantity">{item.quantity}</div>
              <button onClick={() => addToCart(item.product)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="buy-button" onClick={handlePayment}>
        KÖP
      </button>
    </div>
  );
};

export default Payment;