import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) =>{ // dispatch, user info
    dispatch(loginStart()); // Started
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data)); // Success
    } catch(err){
        dispatch(loginFailure()); // Failed
    }
}