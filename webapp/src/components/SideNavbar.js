import React , {Component} from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
  } from '@ant-design/icons';

const {  Sider } = Layout;


class SideNavbar extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentpage : "weather-report",
            collapsed: false,

        }
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    switchView = (e) => {
        let key = e.key ? e.key : e;
        console.log("switched",key)
        if (key === "weather-report") {
          this.props.history.push(`/`);
        } else if (key === "slack-integration") {
          this.props.history.push(`/slack`);
        } else if (key === "user") {
            this.props.history.push(`/user`);
          }
          
         this.setState({ currentpage: key });
      }
      componentDidMount(){
        const path = this.props.location.pathname;
        if(path === "/user"){
          this.setState({currentpage : 'user' })
        }
        if(path === "/"){
          this.setState({currentpage : 'weather-report' })
        }
        if(path === "/slack"){
          this.setState({currentpage : 'slack-integration' })
        }
      }
    render(){
        return(
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              {/* <div className="logo" /> */}
              <Menu theme="dark"  mode="inline"
              defaultSelectedKeys={this.state.currentpage}
              selectedKeys={this.state.currentpage}
              onClick={this.switchView} >
                <Menu.Item key="weather-report" icon={<PieChartOutlined />}>
                  Weather Reports
                </Menu.Item>
                <Menu.Item key="slack-integration" icon={<DesktopOutlined />}>
                  Slack Integration
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined />}>
                  User
                </Menu.Item>
                
              </Menu>
            </Sider>
        )
    }
}
export default withRouter(SideNavbar);