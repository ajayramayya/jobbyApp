import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProductedRoute = props => {
  const key = Cookies.get('jwt_token')
  if (key === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProductedRoute
