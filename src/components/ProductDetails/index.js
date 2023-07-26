import {Component} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import {AiFillStar} from 'react-icons/ai'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Loader from 'react-loader-spinner'
import withRouter from '../withRouter'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductDetails extends Component {
  state = {productDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {params} = this.props
    const {id} = params
    const url = `https://dummyjson.com/products/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()

      const newData = {
        id: jsonData.id,
        brand: jsonData.brand,
        description: jsonData.description,
        discountPercentage: jsonData.discountPercentage,
        image: jsonData.images[0],
        price: jsonData.price,
        rating: jsonData.rating,
        title: jsonData.title,
        stock: jsonData.stock,
      }

      this.setState({
        productDetails: newData,
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
    const {productDetails} = this.state
    console.log(productDetails)

    return (
      <>
        <Header />
        <div className="details-bg-container">
          <div className="details-content-container">
            <img
              className="product-detail-image"
              alt={productDetails.title}
              src={productDetails.image}
            />
            <div className="details-text-container">
              <h1 className="product-title">{productDetails.title}</h1>
              <p className="product-discount">
                Discount:{' '}
                <span className="span">
                  {productDetails.discountPercentage}% off
                </span>
              </p>
              <p className="product-price">
                Price: <span className="span">${productDetails.price}</span>
              </p>
              <p className="product-description">
                {productDetails.description}
              </p>
              <p className="product-price">
                Brand: <span className="span">{productDetails.brand}</span>
              </p>
              <p className="product-price">
                <AiFillStar className="icon" />
                {productDetails.rating} rating
              </p>
            </div>
          </div>
        </div>
      </>
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

export default withRouter(ProductDetails)
