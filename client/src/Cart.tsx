// const Cart = ({items}) => {
  


//     const checkOutBtn = async() => {
//         const response = await fetch("http://localhost:3001/payments/create-checkout-session", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify([
//                 lineItems: Object.values(items),
//             ]),
//         });

//         const {id} = await response.json();
//         localStorage.setItem("sessionId", JSON.stringify(id.sessionId));
//         window.location = id.url;
//     }



//   return (
//     <>
//       <h1>Cart</h1>
//       <button onClick={checkOutBtn}>Check Out</button>
//     </>
//   );
// };

// export default Cart;
