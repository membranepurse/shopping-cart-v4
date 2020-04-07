import React, { Fragment } from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import Navbar from '../components/Navbar'


const App = () => (
  <Fragment>
    <Navbar />
    <h2>Shopping Cart Example</h2>
    <hr/>
    <ProductsContainer />
    <hr/>
    <CartContainer />
  </Fragment>
)

export default App
