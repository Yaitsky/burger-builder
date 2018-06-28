import axios from "axios";
import * as actionTypes from "./actionTypes";

const signupUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA0LilcDRIixDWOsDLcY-PqBBy8gOwvbTM";
const signinUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA0LilcDRIixDWOsDLcY-PqBBy8gOwvbTM";

export const authStart = () => ({
  type: actionTypes.AUTH_STARTED
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: { token, userId }
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAILED,
  payload: { error }
});

export const auth = (email, password, isSignUp) => dispatch => {
  dispatch(authStart());
  axios
    .post(isSignUp ? signupUrl : signinUrl, {
      email,
      password,
      returnSecureToken: true
    })
    .then(({ data }) => {
      const expires = new Date(new Date().getTime() + data.expiresIn * 1000);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("expires", expires);
      localStorage.setItem("userId", data.localId);
      dispatch(authSuccess(data.idToken, data.localId));
      dispatch(setTimeoutToLogout(data.expiresIn));
    })
    .catch(error => dispatch(authFail(error.response.data.error)));
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setTimeoutToLogout = time => dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, time * 1000);
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(authLogout());
  } else {
    const expires = new Date(localStorage.getItem("expires"));
    if (expires < new Date()) {
      dispatch(authLogout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        setTimeoutToLogout((expires.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};
