const App = () => {

  const handlePayment = async () => {
    const response = await fetch('http://localhost:3001/payments/create-checkout-session', {
    method: 'POST',
  })

  const data = await response.json()
  console.log(data)
}

  return (
    <div>
      <button onClick={handlePayment}>Show me the money</button>
    </div>
  )
}

export default App