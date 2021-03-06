import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginWithFirebase } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import validator from 'validator';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"



export const LoginScreen = () => {

    

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          
        ],
        callbacks: {
            signInSuccessWithAuthResult : () => false
        }
      }

    const dispatch = useDispatch()
    const { loading, msgError } = useSelector(state => state.ui)


    const [formValues, handleInputChange] = useForm({
        email: 'adrian@gmail.com',
        password: '123456',
    })

    const { email, password } = formValues;


    const handleLogin = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(startLoginWithFirebase(email, password))
        }
    }
    const handleGoogleLogin = () => {

        dispatch(startGoogleLogin());

    }

    // const handleFacebookLogin = () => {
    //     dispatch(startFacebookLogin());
    // }

    const isFormValid = () => {
        if (email.trim().length === 0) {

            dispatch(setError('Email es requerido'))
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email invalido'))
            return false;
        } else if (password.length < 6) {
            dispatch(setError('Password mayor a 6 digitos'))
            return false;
        }

        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>


                {msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)}

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                    <StyledFirebaseAuth
                     className="loginExternalWrapper"
                  
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>

        </>
    )
}
