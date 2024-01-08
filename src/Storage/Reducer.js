import {LOGIN, SIGNOUT, } from './Constants';

const initialState = {
  userid:"",
  isLoggedIn: false,
 };

export const inkartReducer = (state = initialState, action) => {
  // console.warn(action.type);
  switch (action.type) {
    case LOGIN:
     
      return {
        ...state,
        userid:action.payload.userid,
        isLoggedIn:true,
      };
    case SIGNOUT:
      return {
        ...state,
        userid:'',
        isLoggedIn:false,
      };

      

    default:
      return state;
  }
};
