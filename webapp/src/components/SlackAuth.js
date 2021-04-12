import queryString from "query-string";
import React , {Component} from 'react';
//redux
import { connect } from 'react-redux';
import { install } from '../actions/userActions';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import Dashboard from "./Dashboard";

class SlackAuth extends Component{
    componentDidMount(){
        //stotre user_id and team_id in local storage if not already
        try{
            // console.log("GETTING CODE");
            let team_id = queryString.parse(this.props.location.search).team_id;
            let user_id = queryString.parse(this.props.location.search).user_id;


            // //call INSTALL ACTION add get user in redux store
            this.props.install(user_id , team_id);
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
const mapStateToProps= (state) =>({
    user : state.user
});
export default withRouter(connect(mapStateToProps,{install})(SlackAuth));
