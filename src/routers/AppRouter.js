import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { useState } from 'react';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLogged(true)
            }else{
                setIsLogged(false)
            }
            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLogged])

    if (checking){
        return (
        <div className="center_all ">
            <i className="fas fa-circle-notch fa-spin fa-5x text-center"></i>
            <h5>Cargando espere...</h5>
        </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLogged}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLogged}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
