import React, { useState, createContext } from "react"
import axios from "axios"

export const UserContext = createContext()

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
  }

  const [userState, setUserState] = useState(initState)

  function signup(credentials) {
    axios.post("/api/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function login(credentials) {
    axios.post("/api/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
    window.location.href = '/'
  }

  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  function getAllCalls() {
    return userAxios.get("/api/main/calls")
      .then(res => res.data) 
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        logout,
        signup,
        login,
        userAxios,
        getAllCalls
      }}>
      {props.children}
    </UserContext.Provider>
  )
}