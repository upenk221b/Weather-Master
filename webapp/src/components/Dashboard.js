import React , {Component} from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import SideNavbar from './SideNavbar';
import axios from 'axios';

const { Content, Footer } = Layout;

class Dashboard extends Component{
    state = {
        searchText: '',
        searchedColumn: '',
        data:[],
        isLoggedin:false,
        usr_id : localStorage.getItem('user_id'),
        team_id: localStorage.getItem('team_id')
      };
    
    componentDidMount(){
      axios.get('/api/database/reports').then((res)=>{
        // console.log("RES DATA", res.data);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let formatteddata = res.data.map((report)=>{
         let date = new Date(report.date)
         report.date = date.toLocaleDateString("en-US", options).toString();
        return report;
        })
        // console.log("DATA ",formatteddata);
        
        formatteddata = formatteddata.filter((report)=> report.created_by === this.state.usr_id);
        this.setState({data: [...formatteddata]})
      });

      //set state of loggedin depending on local storage
      if(localStorage.getItem('team_id') && localStorage.getItem('user_id')){
        this.setState({isLoggedin : true})
      }
    }
      
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
      render() {
        // console.log("DATA", this.state.data);

        const columns = [
            {
              title: 'City',
              dataIndex: 'city',
              key: 'city',
            //   width: '30%',
              ...this.getColumnSearchProps('city'),
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            //   width: '20%',
              ...this.getColumnSearchProps('date'),
            },
            {
              title: 'Max Temp (\u2103)',
              dataIndex: 'max_temp',
              key: 'max_temp',
              ...this.getColumnSearchProps('max_temp'),
            },
            {
                title: 'Min Temp (\u2103)',
                dataIndex: 'min_temp',
                key: 'min_temp',
                ...this.getColumnSearchProps('min_temp'),
              },
              {
                title: 'Humidity (%)',
                dataIndex: 'humidity',
                key: 'humidity',
                ...this.getColumnSearchProps('pressure'),
              },
              {
                title: 'Pressure (hPa)',
                dataIndex: 'pressure',
                key: 'pressure',
                ...this.getColumnSearchProps('pressure'),
              },
          ];
          // if(!this.state.isLoggedin){
          //   this.setState({data: []});
          // }
        return (
          <Layout style={{ minHeight: '100vh' }}>
              {/* side nav bar */}
              <SideNavbar />
            <Layout className="site-layout">
                <PageHeader
                title="Weather Reports"
                />
              <Content style={{ padding: "16px 16px 32px 24px", overflow: "initial" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Upendra</Footer>
            </Layout>
          </Layout>
        );
      }
}
export default withRouter(Dashboard);
  // {
    //   key: '1',
    //   city: 'Latur',
    //   date: '24-1-2001',
    //   max: 32,
    //   min:20,
    //   humidity: 2,
    //   pressure:1002
    // },
    // {
    //     key: '1',
    //     city: 'Pune',
    //     date: '25-1-2005',
    //     max: 35,
    //     min:25,
    //     humidity: 5,
    //     pressure:1008
    //   },
    //   {
    //     key: '1',
    //     city: 'Latur',
    //     date: '28-1-2001',
    //     max: 40,
    //     min:29,
    //     humidity: 8,
    //     pressure:1005
    //   },