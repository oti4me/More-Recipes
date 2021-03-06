import axios from 'axios';
import {
  USER_SIGNUP,
  REQUEST_SIGNUP,
  SIGNUP_ERRORS,
  USER_LOGGEDIN
} from './types';

/**
 * @description A function to dispatch an action on user signup success
 * 
 * @param {object} user user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signupAction = (user) => {
  return {
    type: USER_SIGNUP,
    payload: user
  }
};

/**
 * @description A function to dispatch an action on requesting user signup
 * 
 * @param {boolean} isRequesting
 * 
 * @return {Object} action dispatch by the action creator
 */
export const requestSignup = (isRequesting) => {
  return {
    type: REQUEST_SIGNUP,
    payload: isRequesting
  }
};

/**
 * @description A function to dispatch an action on user signup success
 * 
 * @param {object} isLoggedIn user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const loggedIn = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

/**
 * @description A function to dispatch an action on user sigup error
 * 
 * @param {object} errors
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signupError = (errors) => {
  return {
    type: SIGNUP_ERRORS,
    payload: errors
  }
};

/**
 * @description A function to sigup a user
 * 
 * @param {object} userDetails
 * @param {object} Materialize
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signup = (userDetails, Materialize, history) => {
  return dispatch => {
    dispatch(requestSignup({ isRequesting: true }));
    dispatch(signupAction({ user: {} }));
    dispatch(loggedIn({ loggedIn: false }));
    dispatch(signupError({ error: {} }));

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    } = userDetails

    const user = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    }

    return axios.post('/api/v1/users/signup', user)
      .then(response => {
        dispatch(requestSignup({ isRequesting: false }));
        if (response) {
          const { data: { token, user } } = response;
          window.localStorage.setItem('userToken', token);
          dispatch(loggedIn({ loggedIn: true }));
          dispatch(signupAction(user));
          Materialize.toast('Account created successfully', 5000, 'green');
          history.push('/profile');
        }
      })
      .catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(requestSignup({ isRequesting: false }));
        dispatch(signupError({
          error: {
            status,
            message
          }
        }));
        if (status === 400) {
          message.map(err => {
            return Materialize.toast(err.msg, 5000, 'red');
          });
        } else if (status === 401) {
          return Materialize.toast(message, 5000, 'red');
        } else if (status === 409) {
          return Materialize.toast(message, 5000, 'red');
        } else {
          return Materialize.toast("Error Sigin up, please try again later", 5000, 'red');
        }
      });
  }
};