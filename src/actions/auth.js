import Swal from 'sweetalert2'


import { types } from "../types/types"
import { firebase, googleAuthProvider,  facebookAuthProvider } from '../firebase/firebase-config'
import { finishLoading, starLoading } from "./ui"

export const login = (uid, displayName, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL
    }
})

const firebaseErrors = {
    'auth/user-not-found': "Debe ingresar un email valido",
    'auth/email-already-in-use': 'El email consignado ya se encuentra en uso',
    'auth/weak-password': "Password al menos 6 caracteres "
}


export const RegisterAccount = (email, password, name) => {

    return (dispatch) => {

        dispatch(starLoading());

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
 
                await user.updateProfile({ displayName: name})
                dispatch(
                    login(user.uid , user.displayName)
                )
                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: firebaseErrors[e.code] || e.message
                  
                  })
                dispatch(finishLoading());
            })
    }
}



export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
              
                dispatch(
                    login(user.uid,
                        user.displayName,
                        user.photoURL
                        )
                )
            })
    }
}

export const startFacebookLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(facebookAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid,
                        user.displayName,
                        user.photoURL
                        )
                )
            })
    }
}

export const startLoginWithFirebase = (email, password) => {
    return (dispatch) => {
        dispatch(starLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          dispatch(
            login(user.uid,
                user.displayName,
                user.photoURL
                )
          )
          dispatch(finishLoading());
        })
        .catch(e => {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: firebaseErrors[e.code] || e.message
              
              })
            dispatch(finishLoading());
        })
    }

 }

export const startLogout = () => {
    return ( async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())

    })
}

export const logout = () => ({
    type: types.logout
})


