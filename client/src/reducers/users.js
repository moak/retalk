import { GET_USERS_SUCCESS } from '../actions/users';

const initialState = {
  users: []
}

export default function reducer(state = initialState, action) {

  switch (action.type) {

  case GET_USERS_SUCCESS:
    return {
      ...state,
    }
  default:
    return state
  }
}
