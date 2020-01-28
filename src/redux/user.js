const axios = require('axios')

// Actions
const SET_USER = 'redux/users/SET_USER'
const LOG_OUT = 'redux/users/LOG_OUT'
const SIGN_IN = 'redux/users/SIGN_IN'
const SIGN_UP = 'redux/users/SIGN_UP'
const SIGN_UP_COMPLETE = 'redux/users/SIGN_UP_COMPLETE'

// Reducer

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                profileName: action.payload.username,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt
            }
        case LOG_OUT:
            return initialState
        case SIGN_IN:
            return {
                ...state,
                isFetching: true
            }
        case SIGN_UP:
            return {
                ...state,
                isFetching: true
            }
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

export default currentUser


// Action Creators
const setUser = (userObj) => {
    return {
        type: SET_USER,
        payload: userObj
    }
}

const signIn = (userObj) => dispatch => {
    dispatch({
        type: SIGN_IN
    })
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/login ',
        data: {
            username: userObj.username,
            password: userObj.password
        }
    })
        .then(function (response) {
            // handle success
            dispatch({
                type: SET_USER,
                payload:
                {
                    username: userObj.username,
                    jwt: response.data.jwt
                }
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
        .then(function () {
            // always executed
        })
}

const signUp = (userObj) => dispatch => {
    dispatch({
        type: SIGN_UP
    })
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/register ',
        data: {
            username: userObj.username,
            password: userObj.password
        }
    })
        .then(function (response) {
            // handle success
            if (response.data.userId) {
                console.log('user created!')
                dispatch({
                    type: SIGN_UP_COMPLETE
                })
                dispatch(signIn(userObj)) //Auto login on successful register
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
        .then(function () {
            // always executed
        })
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
    setUser,
    logOut,
    signIn,
    signUp
}
