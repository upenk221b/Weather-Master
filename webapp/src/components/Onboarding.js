import React , {Component} from 'react';
import Dashboard from './Dashboard';
import { withRouter } from 'react-router-dom';

class Onboarding extends Component{
    render(){
        return(
            <React.Fragment>
                <Dashboard/>
            </React.Fragment>
        )
    }
}

export default withRouter(Onboarding)