import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterAccount } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)
   
    console.log(msgError); 

   
    const [formValues, handleInputChange] = useForm({
        name: 'Adrian',
        email: 'adrian@gmail.com',
        password: '123456',
        password2: '123456',
    })

    const { name,
        email,
        password,
        password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
           dispatch( RegisterAccount(email, password, name))
        }


    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
         
            dispatch(setError('Name is required'))
            return false;
        } else if (!validator.isEmail(email)) {
         
            dispatch(setError('Email no es valido'))
            return false;
        } else if (password !== password2 ) {
           
            dispatch(setError('Password no es igual'))
            return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

              { msgError &&
              ( <div className="auth__alert-error">
                   {msgError}
                </div>)}

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}

                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
