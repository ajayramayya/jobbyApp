import './index.css'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {RiSuitcaseLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-nav-card">
      <Link className="link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo-img"
        />
      </Link>
      <ul className="moblie-icons-tab">
        <Link className="link" to="/">
          <li className="moblie-icons-item">
            <AiFillHome className="icon-style" />
          </li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="moblie-icons-item">
            <RiSuitcaseLine className="icon-style" />
          </li>
        </Link>
        <button type="button" className="moblie-logout-button" onClick={logout}>
          <li className="moblie-icons-item">
            <FiLogOut className="icon-style" />
          </li>
        </button>
      </ul>
      <div className="desktop-link-tab">
        <Link className="link" to="/">
          <p className="link-para">Home</p>
        </Link>
        <Link className="link" to="/jobs">
          <p className="link-para">Jobs</p>
        </Link>
      </div>
      <button type="button" className="desktop-logout-button" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
