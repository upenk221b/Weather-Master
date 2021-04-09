import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import SideNavbar from './SideNavbar';
import { Layout, PageHeader, Row , Col, message} from 'antd';
import {  Card , Button , Typography , Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { Table, Input, Button, Space } from 'antd';
import '../App.css';
import 'antd/dist/antd.css';
import axios from "axios";
const { Content, Footer } = Layout;
const {Text} = Typography;
class Slack extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoggedin : false
        }
    }
    componentDidMount(){
        //set state of loggedin depending on local storage
      if(localStorage.getItem('team_id') && localStorage.getItem('user_id')){
        this.setState({isLoggedin : true})
      }
    }
    uninstallHandler = async (e)=>{
        //api call to delete user from database and uninstall app
        console.log("uninstalling")
        try {
            let response = await axios.post(`/slack/uninstall?user_id=${localStorage.getItem('user_id')}&team_id=${localStorage.getItem('team_id')}`)
            console.log(response);
            console.log(response.data)
            if(response && response.data){
                if(response.data.success){
                    localStorage.removeItem("team_id");
                    localStorage.removeItem("user_id");
                    console.log("REMOVED LOCAL STORAGE")
                    // window.location.reload()
                    this.setState({isLoggedin : false})
                    message.success("Uninstall successful!!")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    uninstallConfirmModal = async ()=>{
        Modal.confirm({
          title: "Uninstall",
          icon: <ExclamationCircleOutlined />,
          content: (
            <p>
              Are you sure you want Uninstall Weather Master?
            </p>
          ),
          onOk: () => this.uninstallHandler(),
          onCancel: () => {},
        });
      }
    gotoSlackApp = ()=>{
        let slackURL = "https://app.slack.com/client/"+localStorage.getItem('team_id');
        window.open(slackURL)
    }
    render(){
        return(
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* side nav bar */}
                    <SideNavbar />
                    <Layout className="site-layout">
                        <PageHeader
                        title="Slack Integration"
                        />
                    <Content style={{ padding: "16px 16px 32px 24px", overflow: "initial" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Row gutter={[16, 16]}>
                                <Col span={12}  >
                                        {!this.state.isLoggedin ? 
                                        <Card
                                            style={{ width: "100%" }}
                                            title="Add to Slack"
                                            size='small'
                                            bodyStyle={{ overflow: "hidden" }}
                                            extra={<Button type='primary' target="blank" href="https://slack.com/oauth/v2/authorize?client_id=1795214553365.1922088190196&scope=channels:history,chat:write,im:write,commands&user_scope=identity.basic,identity.email,identity.team" >Add</Button>}
                                            >
                                            
                                            <div>
                                                <Text type="secondary">
                                                Add Weather Master to slack and get live weather information directly into slack</Text>
                                            </div>
                                        </Card>
                                        
                                        :
                                        <Card
                                            style={{ width: "100%" }}
                                            title="Remove Slack App"
                                            size='small'
                                            bodyStyle={{ overflow: "hidden" }}
                                            extra={<Button type='primary' onClick={this.uninstallConfirmModal} >Uninstall</Button>}
                                            >
                                            <div>
                                            <Text type="secondary">
                                                This will uninstall the Weather Master from your Slack Workspace and you will not be able to view Reports from Weather Master Here.
                                            </Text>
                                            </div>
                                        </Card>
                                    }
                                </Col>
                                
                                {this.state.isLoggedin &&
                                <Col span={12}>
                                <Card
                                    style={{ width: "100%" }}
                                    title="Go to Slack App"
                                    size='small'
                                    bodyStyle={{ overflow: "hidden" }}
                                    extra={<Button type='primary' onClick={this.gotoSlackApp} >Go to Slack</Button>}
                                    >
                                    <div>
                                    <Text type="secondary">
                                        Go to the slack app installed in your Workspace.
                                    </Text>
                                    </div>
                                </Card>        
                                </Col> }
                                
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

export default withRouter(Slack);