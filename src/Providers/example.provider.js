import React,{createContext, useState, useEffect} from 'react'
import shop from '../api/shop'
import PRODUCTS_DATA from './products'

export const ProductsContext = createContext({
    products: [],
    test : '',
    cart: [],
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0    
})

const ProductsProvider = ({children}) => {
    /* 
    const [cart, setCart] = useState([])

    */
    const [cart, setCart] = useState(
        JSON.parse ( localStorage.getItem('cart') ) || []
    );
    const [products, setProducts] = useState([])
    const test = "this is a test"

    useEffect(() => {
        loadProducts()
        showCart()
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const loadProducts = async () => {
        const response = await shop.getProducts(products =>
            products)
            setProducts(response)
    }

    const getProd = id => {
        let result = [];
        result = products.find(item => item.id === id)
        return result
    }

    const checkout = cart => {
        console.log(cart)
        console.log('has been checked out')
    }
    const addCart = id => {
        let temp = [...products];
        const index = temp.indexOf(getProd(id))
        const product = temp[index]
        const prod = getProd(id)
        const final = [...cart, prod]
        setCart(final)
        console.log(cart)
        return prod
    }

    const removeCart = id => {
        let tempCart = cart
        tempCart = tempCart.filter(item => {
            return item.id !== id
        })
        setCart(tempCart)
    }

    const clearCart = () => {
        const emptyCart = []
        setCart(emptyCart)
        console.log(cart)
    }

    const showCart = () => {
        console.log('THE CART...')
        console.log(cart);
        console.log(calcTotal())
    }

    const calcTotal = () => {
        let subtotal = 0;
        console.log('THE CART total...')
        console.log(cart);
        const results = cart.map(item => (subtotal +=  item.price))
        const index = results.length - 1
        return results[index]
    }

    const getTotal = () => {
        return 
    }

    return (
        <ProductsContext.Provider value={{
            products,
            test,
            cart,
            getProd,
            addCart,
            removeCart,
            clearCart,
            showCart,
            calcTotal,
            checkout
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider