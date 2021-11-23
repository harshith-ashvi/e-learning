const userInitialState = {
    isLoading: false,
    data: {},
    errors: {}
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case "ADD_USER_ERRORS" : {
            return {...state, errors: action.payload}
        }

        case "CLEAR_USER_ERRORS" : {
            return {...state, errors: {}}
        }

        case "LOADING_UPDATE" : {
            return {...state, isLoading: !state.isLoading}
        }

        case "ADD_USER_DETAILS" : {
            return {...state, data: action.payload, errors: {}}
        }

        case "REMOVE_DATA" : {
            return {...state, data: {}}
        }

        default : {
            return {...state}
        }
    }
}

export default userReducer