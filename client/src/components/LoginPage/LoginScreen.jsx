import React from 'react'

const LoginScreen = () => {

    const handleLogin = ()=>{
        window.location.href = 'http://localhost:5050/login/spotify';
    }

  return (
    <div>
        <button onClick={handleLogin}>
            Login
        </button>
    </div>
  )
}

export default LoginScreen