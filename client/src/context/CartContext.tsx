import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export interface Product {
    id: string,
    name: string,
    description: string,
    images: string[]
    default_price: {
        unit_amount: number
    }
}

interface CartItem {
    product: Product,
    quantity: number
}

interface ICartContext {
    cart: CartItem[],
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
}

const initalValues: ICartContext = {
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { }
}

const CartContext = createContext<ICartContext>(initalValues)
export const useCart = () => useContext(CartContext)

const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const lsData = localStorage.getItem("cart")
        return lsData ? JSON.parse(lsData) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        const clonedCart = [...cart]

        const productAlreadyExists = clonedCart.find(item => item.product.id === product.id)

        if (productAlreadyExists) {
            productAlreadyExists.quantity++
            setCart(clonedCart)
        } else {
            setCart([...cart, { product, quantity: 1 }])
        }
    }

    const removeFromCart = (productId: string) => {
        const clonedCart = [...cart];
        const productIndex = clonedCart.findIndex(item => item.product.id === productId);

        if (productIndex !== -1) {
            if (clonedCart[productIndex].quantity > 1) {
                clonedCart[productIndex].quantity--;
            } else {
                clonedCart.splice(productIndex, 1);
            }
            setCart(clonedCart);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;