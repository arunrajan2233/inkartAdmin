import { LOGIN, SIGNOUT,  } from "./Constants";

export const login=data=>({
    type:LOGIN,
    payload:{
        userid:data.userid,
 
    }
});

export const signout =data=>({
    type:SIGNOUT,
    payload:{},
});

 
