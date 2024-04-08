const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{
          product: "price_1P1Pwv01f7VXReymUyPYhQzL", //blir inte hårdkodat sen, ser ut olika beroende på hur man gjort sin kundvagn
          quantity: 2
        },
      ]),
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