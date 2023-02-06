import { LOGIN_USER } from "store/actions/AuthAction";

const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
