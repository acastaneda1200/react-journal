import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    const state = useSelector(state => state)
   


    return (
        <div className="auth__main">
            {
                ( state !== null ) ?
                    <div className="auth__box-container">
                        <Switch>
                            <Route
                                exact
                                path="/auth/login"
                                component={LoginScreen}
                            />

                            <Route
                                exact
                                path="/auth/register"
                                component={RegisterScreen}
                            />

                            <Redirect to="/auth/login" />


                        </Switch>
                    </div>
                    :
                    <i className="fas fa-circle-notch fa-spin "></i>

                }


        </div>
    )
}
