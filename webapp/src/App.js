import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import User from './components/UserInfo';
import Slack from './components/Slack';
import SlackAuth from './components/SlackAuth';
//redux setup
import { connect } from 'react-redux';
import { getCurrentState} from './actions/userActions';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  componentDidMount(){
    //make redux store persistant
  
    const user_id = localStorage.getItem('user_id')
    const team_id = localStorage.getItem('team_id')
    console.log(`storage ${user_id} ${team_id}`)
    if(user_id && team_id){
      this.props.getCurrentState(user_id,team_id);
    }
  }
  render(){
    return (
      
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/user" component={User}/>
              <Route exact path="/slack" component={Slack}/>
              <Route path="/onboarding" component={SlackAuth}/>
              {/* <Route path="/onboarding" component={Onboarding}/> */}
  
            </Switch>
            
          </div>
        </Router>
    );
  }
  
}
const mapStateToProps= (state) =>({
  user : state.user
});
export default connect(mapStateToProps,{getCurrentState})(App);
