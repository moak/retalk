
import User from '../services/user';

export const GET_USERS         =  'GET_USERS';
export const GET_USERS_SUCCESS =  'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE =  'GET_USERS_FAILURE';

const getUsersSuccess = (res) => {
  console.log('res', res);
  return {
    type: GET_USERS_SUCCESS,
    users: res,
  }
}

const getUsersFailure = () => {
  return {
    type: GET_USERS_FAILURE,
  }
}

export const getUsers = () => {
  console.log('get users');
  return dispatch => {
    return User.getUsers().then(
      (res) => dispatch(getUsersSuccess(res)),
      () => dispatch(getUsersFailure())
    );
  };
};
