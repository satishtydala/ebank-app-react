import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', isShowError: false}

  submitSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 365})
    history.replace('/')
  }

  submitFailureView = errorMsg => {
    this.setState(prevState => ({
      isShowError: !prevState.isShowError,
      errorMessage: errorMsg,
    }))
  }

  onSubmitLoginPage = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      return this.submitSuccessView(data.jwt_token)
    }
    return this.submitFailureView(data.error_msg)
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMessage, isShowError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card-details">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>
          <div className="login-form-details">
            <h1 className="welcome-heading">Welcome Back!</h1>
            <form onSubmit={this.onSubmitLoginPage}>
              <div className="input-container">
                <label htmlFor="username" className="label-name">
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  id="username"
                  className="input-details"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label-name">
                  PIN
                </label>
                <input
                  type="password"
                  placeholder="Enter PIN"
                  id="password"
                  className="input-details"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {isShowError && <p className="error-msg">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
