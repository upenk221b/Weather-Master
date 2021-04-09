import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import SideNavbar from './SideNavbar';
import { Layout, PageHeader } from 'antd';
import {  Card , Button , Typography , Row , Col} from 'antd';
import axios from 'axios';
const { Content, Footer } = Layout;
const {Text} = Typography;

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoggedin : false,
            user : null
        }
    }
     componentDidMount(){
        //set state of loggedin depending on local storage
      if(localStorage.getItem('team_id') && localStorage.getItem('user_id')){
        this.setState({isLoggedin : true})
      }

      //get user info if logged in
      try{
        axios.get(`/api/database/user?user_id=${localStorage.getItem('user_id')}&team_id=${localStorage.getItem('team_id')}`).then(res=>{
            console.log(res.data);
            this.setState({user : res.data});
        })
      }catch(e){
        console.log(e)
      }
    }
    render(){
        const user = this.state.user
        if(user){
            var city = user.default_city ? user.default_city : "Not set";
        }
        return(
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* side nav bar */}
                    <SideNavbar />
                    <Layout className="site-layout">
                        <PageHeader
                        title="User"
                        />
                    <Content style={{ padding: "16px 16px 32px 24px", overflow: "initial" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Row gutter={[16, 16]}>
                                <Col span={12}  >
                                        {!this.state.isLoggedin ? 
                                        <Card
                                            style={{ width: "100%" }}
                                            title="Not Logged in"
                                            size='small'
                                            bodyStyle={{ overflow: "hidden" }}
                                            extra={<Button type='primary' target="blank" href="https://slack.com/oauth/v2/authorize?client_id=1795214553365.1922088190196&scope=channels:history,chat:write,im:write,commands&user_scope=identity.basic,identity.email,identity.team" >Add</Button>}
                                            >
                                            
                                            <div>
                                                <Text type="secondary">
                                                    Add Weather Master to Slack Workspace to login
                                                </Text>
                                            </div>
                                        </Card>
                                        :
                                        <Card
                                            style={{ width: "100%" }}
                                            title="User Profile"
                                            size='small'
                                            bodyStyle={{ overflow: "hidden" }}
                                            >
                                            
                                            {user && 
                                            <div>
                                            <Text type="secondary">Name: <strong><Text type="primary">{user.name}</Text></strong><br/></Text>
                                            <Text type="secondary">Email: <strong><Text type="primary">{user.email}</Text></strong><br/></Text>
                                            <Text type="secondary">Default City: <strong><Text type="primary">{city}</Text></strong><br/></Text>
                                            <Text type="secondary">Workspace: <strong><Text type="primary">{user.workspace_name}</Text></strong><br/></Text>
                                            </div>
                                        }
                                            
                                            
                                        </Card>  
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Upendra</Footer>
                    </Layout>
                </Layout>
            </React.Fragment>
        )
    }
}

export default withRouter(User);