import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = {token: JSON.parse(tokenString)}
    return userToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}