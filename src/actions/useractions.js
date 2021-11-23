import axios from "axios";
import jwt_decode from "jwt-decode";

export const startAdminRegister = (formData, resetForm, redirectLogin) => {
    return (
        (dispatch) => {
            return (
                axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", formData)
                    .then((response) => {
                        const result = response.data
                        if(result.hasOwnProperty("errors")) {
                            dispatch(addUserErrors(result))
                        } else {
                            dispatch(clearUserErrors())
                            resetForm()
                            redirectLogin()
                        }
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            )
        }
    )
}

export const addUserErrors = (errors) => {
    return {
        type: "ADD_USER_ERRORS",
        payload: errors
    }
}

export const clearUserErrors = () => {
    return {
        type: "CLEAR_USER_ERRORS"
    }
}

export const startLoginAdmin = (formData, resetForm, redirect) => {
    return (
        (dispatch) => {
            return (
                axios.post("https://dct-e-learning.herokuapp.com/api/admin/login", formData)
                    .then((response) => {
                        const result = response.data
                        if(result.hasOwnProperty("errors")) {
                            dispatch(addUserErrors(result))
                        } else {
                            alert("Successfully Logged in")
                            dispatch(clearUserErrors())
                            dispatch(startGetAdminDetails(result.token))
                            localStorage.setItem("token", result.token)
                            resetForm()
                            redirect()
                        }
                    })
            )
        }
    )
}

export const startGetAdminDetails = (token) => {
    const adminDetails = axios.get("https://dct-e-learning.herokuapp.com/api/admin/account", {
        "headers": {
            "Authorization": token
        }
    })

    return (
        (dispatch) => {
            dispatch(loadingUpdate())
            return (
                Promise.all([adminDetails])
                    .then((response) => {
                        const [ account ] = response
                        dispatch(loadingUpdate())
                        dispatch(addUserDetails(account.data))
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            )
        }
    )
}

export const startLoginStudent = (formData, resetForm, redirect) => {
    return (
        (dispatch) => {
            return (
                axios.post("https://dct-e-learning.herokuapp.com/api/students/login", formData)
                    .then((response) => {
                        const result = response.data
                        if(result.hasOwnProperty("errors")) {
                            dispatch(addUserErrors(result))
                        } else {
                            alert("Successfully Logged in")
                            dispatch(clearUserErrors())
                            const decoded = jwt_decode(result.token)
                            console.log(decoded)
                            dispatch(startGetStudentDetails(decoded._id, result.token))
                            localStorage.setItem("token", result.token)
                            resetForm()
                            redirect()
                        }
                    })
            )
        }
    )
}

export const startGetStudentDetails = (id, token) => {
    const studentDetails = axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`, {
        "headers": {
            "Authorization": token
        }
    })

    return (
        (dispatch) => {
            dispatch(loadingUpdate())
            return (
                Promise.all([studentDetails])
                    .then((response) => {
                        const [ account ] = response
                        dispatch(loadingUpdate())
                        dispatch(addUserDetails(account.data))
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            )
        }
    )
}

export const addUserDetails = (details) => {
    return {
        type: "ADD_USER_DETAILS",
        payload: details
    }
}

export const loadingUpdate = () => {
    return {
        type: "LOADING_UPDATE"
    }
}

export const removeData = () => {
    return {
        type: "REMOVE_DATA"
    }
}