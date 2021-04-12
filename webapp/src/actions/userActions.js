import {GET_CURRENT_STATE, INSTALL , UNINSTALL} from './Types';
import axios from 'axios';
export const install = (user_id , team_id) => dispatch =>{
    console.log("END POINT: ", `/api/database/user?user_id=${user_id}&team_id=${team_id}` )
    axios
    .get(`/api/database/user?user_id=${user_id}&team_id=${team_id}`)
    .then(res => {
        console.log(res.data)
        //SET Localstorage
        if(res.data){
            localStorage.setItem('user_id', res.data.id);
            localStorage.setItem('team_id' , res.data.team_id);
            dispatch({
                type: INSTALL,
                payload: res.data
            })
        }
        
    }
    )
};

export const uninstall = (user_id , team_id) => dispatch =>{

    axios.post(`/slack/uninstall?user_id=${user_id}&team_id=${team_id}`)
    .then( response =>{
        console.log(response.data)
        localStorage.removeItem('user_id');
        localStorage.removeItem('team_id');
            if(response && response.data){
                if(response.data.success){
                    dispatch({
                        type: UNINSTALL
                    })
                }
            }
    }
    )
            
};

export const getCurrentState = (user_id , team_id) => dispatch =>{

    console.log("END POINT: Current ", `/api/database/user?user_id=${user_id}&team_id=${team_id}` )
    axios
    .get(`/api/database/user?user_id=${user_id}&team_id=${team_id}`)
    .then(res => {
        console.log(res.data)
        if(res.data){
            dispatch({
                type: GET_CURRENT_STATE,
                user: res.data,
                isLoggedin :true
            })
        }else{
            dispatch({
                type: GET_CURRENT_STATE,
                user: null,
                isLoggedin :false
            }) 
        }
        
    }
    )
            
};
