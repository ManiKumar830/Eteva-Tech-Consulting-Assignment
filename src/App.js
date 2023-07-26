import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Home from './components/Home'
import Cart from './components/Cart'

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </div>
  </Router>
)

export default App
