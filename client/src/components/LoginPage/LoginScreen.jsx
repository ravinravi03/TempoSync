import React from 'react'
import LoginHeader from './LoginHeader';
import LoginBox from './LoginBox';

const LoginScreen = () => {

    return (
      <div className="bg-on-background min-h-screen flex flex-col items-center justify-between">
        <LoginHeader />
        <LoginBox />
      </div>
    )
}

export default LoginScreen