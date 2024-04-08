import { useCart } from "./context/CartContext";
import "./payment.css";


const Payment = () => {
  const {cart} = useCart();

  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
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
            <img
              className="product-image"
              src={item.product.images[0]}
              alt={item.product.name}
            />
            <div className="product-details">
              <div className="product-name">{item.product.name}</div>
              <div className="product-quantity">Antal: {item.quantity}</div>
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