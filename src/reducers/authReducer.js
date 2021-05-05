import { types } from "../types/types";

const initialState  = {
    uid: 121212,
    name : 'Adrian Castañeda',
    dir: {
        a:12
    }
}


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return { }
        default:
            return state;
    }
}
