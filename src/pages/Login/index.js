import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [loginPageStates, setLoginPageStates] = useState({
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  })
  const {username, password, showSubmitError, errorMsg} = loginPageStates

  const onChangeUsername = event => {
    setLoginPageStates(prev => ({
      ...prev,
      username: event.target.value,
    }))
  }

  const onChangePassword = event => {
    setLoginPageStates(prev => ({
      ...prev,
      password: event.target.value,
    }))
  }
  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = Msg => {
    setLoginPageStates({errorMsg: Msg, showSubmitError: true})
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1>UNI Resto Cafe</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field"
            onChange={onChangePassword}
            placeholder="password"
          />
        </div>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
