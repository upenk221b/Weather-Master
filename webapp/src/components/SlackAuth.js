import queryString from "query-string";
import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import Dashboard from "./Dashboard";

class SlackAuth extends Component{
    componentDidMount(){
        //stotre user_id and team_id in local storage if not already
        try{
            console.log("GETTING CODE");
            let team_id = queryString.parse(this.props.location.search).team_id;
            let user_id = queryString.parse(this.props.location.search).user_id;

            console.log("Teamid: ", team_id , "USRRRRr" , user_id);

            localStorage.setItem('user_id', user_id);
            localStorage.setItem('team_id', team_id);
            console.log("LOCAL STORAGE SET");
            message.success("You are logged in!!")

        }catch(e){
            console.log(e);
        }
        
    }
    render(){
        return(
            <React.Fragment>
                <Dashboard/>
            </React.Fragment>
        )
    }
}

export default withRouter(SlackAuth);