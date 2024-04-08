import { useCart } from "./context/CartContext";


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
    <>
      <button onClick={handlePayment}>KÖP</button>

    </>
  );
};
export default Payment;