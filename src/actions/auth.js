import { types } from "../types/types" 
import { firebase, auth , googleAuthProvider} from '../firebase/firebase-config'

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
})
 
export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({user}) => {
            dispatch(
                login(user.uid,
                     user.displayName)
            )
        })
    }
}