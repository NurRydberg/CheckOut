const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            product: "price_1P1Pwv01f7VXReymUyPYhQzL",
            quantity: 3,
          },
        ]),
      }
      );

    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <>
      <button onClick={handlePayment}>KÖP</button>
      <h1>hej</h1>
    </>
  );
};
export default Payment;
