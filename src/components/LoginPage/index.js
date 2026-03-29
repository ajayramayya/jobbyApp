import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {IoMdClose} from 'react-icons/io'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isShowErrorMsg: false,
  }

  onSubmitSuccess = key => {
    const {history} = this.props

    Cookies.set('jwt_token', key, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    console.log(msg)
    this.setState({isShowErrorMsg: true, errorMsg: msg})
  }

  submitTheUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  setTheUsername = Event => {
    this.setState({username: Event.target.value})
  }

  setThePassword = Event => {
    this.setState({password: Event.target.value})
  }

  render() {
    const {errorMsg, username, password, isShowErrorMsg} = this.state
    const key = Cookies.get('jwt_token')
    if (key !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app">
        <div className="login-middle-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-img"
          />
          <form className="form-card" onSubmit={this.submitTheUserDetails}>
            <div className="input-card">
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.setTheUsername}
                value={username}
              />
            </div>
            <div className="input-card">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.setThePassword}
                value={password}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isShowErrorMsg && <p className="error-msg-para">*{errorMsg}</p>}

            <Popup
              modal
              trigger={
                <button type="button" className="sample-button">
                  Sample login Credentials
                </button>
              }
              className="popup-container"
            >
              {close => (
                <>
                  <div className="modal-container">
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      <IoMdClose size="22" />
                    </button>
                    <div className="login-details">
                      <p className="user-heading">User 1</p>
                      <p className="user-para">
                        USERNAME: <span className="span">rahul</span>{' '}
                      </p>
                      <p className="user-para2">
                        PASSWORD: <span className="span">rahul@2021</span>{' '}
                      </p>
                    </div>
                    <div className="login-details">
                      <p className="user-heading">User 2</p>
                      <p className="user-para">
                        USERNAME: <span className="span">raja</span>{' '}
                      </p>
                      <p className="user-para2">
                        PASSWORD: <span className="span">raja@2021</span>{' '}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
