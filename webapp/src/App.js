import './App.css';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import User from './components/UserInfo';
import Slack from './components/Slack';
import SlackAuth from './components/SlackAuth';
import Onboarding from './components/Onboarding'
function App() {
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

export default (App);
