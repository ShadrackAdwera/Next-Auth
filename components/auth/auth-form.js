import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';

import classes from './auth-form.module.css';

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const handleSignUp = async(e) => {
    e.preventDefault();
  const userEmail = emailRef.current.value;
  const userPassword = passwordRef.current.value;
  const userDetails = {
    email: userEmail,
    password: userPassword
  }
    if(isLogin) {
      const result = await signIn('credentials', { redirect: false, email: userEmail, password: userPassword });
      console.log(result);
    emailRef.current.value = '';
    passwordRef.current.value = '';
    } else {
    props.onSubmit(userDetails);
    emailRef.current.value = '';
    passwordRef.current.value = '';
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSignUp}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;