import React from 'react';

interface IProduct {
  id: string;
  name: string;
}

const ShoppingCart = ({ cartItems, removeFromCart }: { cartItems: IProduct[], removeFromCart: (productId: string) => void }) => {
    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
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

export default ShoppingCart;
