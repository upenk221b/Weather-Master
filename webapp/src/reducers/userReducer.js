import {INSTALL , UNINSTALL , GET_CURRENT_STATE } from '../actions/Types';
const initialState ={
    user :null,
    isLoggedin : false
};

export default function(state= initialState, action){
    switch(action.type){
        case INSTALL:
            return {
                ...state,
                user : action.payload,
                isLoggedin : true
            };
        case UNINSTALL:
            return {
                ...state,
                user: null,
                isLoggedin : false
            }
        case GET_CURRENT_STATE :
            return {
                ...state,
                user : action.user,
                isLoggedin : action.isLoggedin
            }   
        default:
            return state;
        
    }
}