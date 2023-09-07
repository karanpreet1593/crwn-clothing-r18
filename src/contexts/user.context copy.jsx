import { createContext, useEffect, useReducer } from "react";  
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

const userActions = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'  
}

const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case(userActions.SET_CURRENT_USER) :
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {

const [state, dispatch] = useReducer(userReducer,INITIAL_STATE)

const {currentUser} = state

const setCurrentUser = (user) => {
    dispatch({type: userActions.SET_CURRENT_USER, payload: user})
}

const value = {currentUser, setCurrentUser}

useEffect(()=>{
   const unsubscribe = onAuthStateChangedListner((user)=>{
    if(user) {
        createUserDocumentFromAuth(user)
    }
    setCurrentUser(user)
    console.log(user)
   })
   return unsubscribe
}, [])

    return<userContext.Provider value={value} >{children}</userContext.Provider>
}