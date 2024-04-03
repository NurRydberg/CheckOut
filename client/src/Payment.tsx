const Payment = () => {

    
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    window.location = data.url;
  };

  return (
    <>
      <button onClick={handlePayment}>Show me the money</button>
      <h1>hej</h1>
    </>
  );
};
export default Payment;
