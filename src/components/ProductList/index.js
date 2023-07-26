import {Component} from 'react'

import {Link} from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductList extends Component {
  state = {AllProductsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://dummyjson.com/products'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)

      const newData = jsonData.products.map(eachItem => ({
        id: eachItem.id,
        brand: eachItem.brand,
        description: eachItem.description,
        discountPercentage: eachItem.discountPercentage,
        image: eachItem.images[0],
        price: eachItem.price,
        rating: eachItem.rating,
        title: eachItem.title,
        stock: eachItem.stock,
      }))

      this.setState({
        AllProductsList: newData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <Loader.TailSpin
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderPrimeDealsListView = () => {
    const {AllProductsList} = this.state
    console.log(AllProductsList)

    return (
      <div>
        <Header />
        <div className="products-container">
          <h1 className="product-list-heading">Product List</h1>
          <div className="product-list">
            {AllProductsList.map(product => (
              <div key={product.id} className="product-card">
                <Link className="link-item" to={`/product/${product.id}`}>
                  <div className="product-content">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="product-text">
                      <h1 className="title">{product.title}</h1>
                      <p className="discount">
                        Discount:{' '}
                        <span className="span">
                          {product.discountPercentage}% off
                        </span>
                      </p>
                      <p className="discount">
                        Price: <span className="span">${product.price}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProductList
