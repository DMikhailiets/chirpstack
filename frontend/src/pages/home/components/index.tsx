import React, { useState, useEffect } from 'react'
import style from './main_page.module.css'
import { Layout, Menu, Badge, Row, Col } from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import notification from '../../../components/Notification';
import { Organizations } from '../../organizations';

const { Sider } = Layout;

const Home = (props:any) => {
      // useEffect(() => {
      //   if(user.fullname !== 'User'){
      //     notification({
      //       text: "nice to meet you!)",
      //       type: 'success',
      //       title: "Success!",
      //       duration: 5
      //     })
      //   }
      // },[])
      let [ collapsed, setEditMode ] = useState(true);
      let changeEditMode = () => {
          if(collapsed == false){
              setEditMode(true);
          } else {
              setEditMode(false);
          }
      }
      if(!localStorage.token && localStorage.token === undefined){
        return (
          <Redirect to='/'/>
        )
      }
      
          return (
          
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={130}  collapsedWidth={80} collapsed={collapsed} onCollapse={changeEditMode} onMouseEnter={() => (setEditMode(false))} onMouseLeave={() => (setEditMode(true))}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
                  <Menu.Item key="1">
                    <NavLink to="/home/organizations">
                    <AppstoreOutlined />
                      <span>Organizations</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/home/logistics">
                      <SettingOutlined/>
                      <span>Settings</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item onClick={() => props.logout()}key="3">
                    <NavLink to="/home/orders">
                    <LogoutOutlined/>
                      <span>Logout</span>
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
              {/* <Row>
                <Col span={4}/>
                <Col span={16}>
                <Route path="/main_page/dialogs" render = { () => <DialogsPage/>}/>
                <Route path="/main_page/logistics" render = { () => <div>Hi</div>}/>
                <Route path="/main_page/orders" render = { () => <div>Hi</div>}/>
                </Col>
                <Col span={4}/>
              </Row> */}
              <Route path="/home/organizations/" render = { () => <Organizations/>}/>
                <Route path="/home/logistics" render = { () => <div>Hi</div>}/>
                <Route path="/home/orders" render = { () => <div>Hi</div>}/>
              </Layout>
            </Layout>
          );
        
      }

export default Home

