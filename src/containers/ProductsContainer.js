import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'
import {ProductsContext} from '../Providers/example.provider'

//pull products from useContext rather than from ProductsContainer component
const ProductsContainer = () => {
const {cartTax, cart, products, getProd, addCart, clearCart, showCart } = useContext(ProductsContext)
console.log('here')
console.log(cart)

return (
  <div>
    <ProductsList title="Products">
      {products.map(product =>
        <ProductItem
          key={product.id}
          product={product}
          onAddToCartClicked={() => addCart(product.id)} />
      )}
    </ProductsList>
    <button onClick={clearCart}>
        Clear Cart
    </button>
    <button onClick={showCart}>
        Update Cart
    </button>
  </div>

)}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  null
)(ProductsContainer)
