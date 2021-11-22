import axios from "axios";

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