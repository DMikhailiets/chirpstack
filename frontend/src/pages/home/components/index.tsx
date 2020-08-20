import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { ServiceProfilesPage, DevicesPage, Organizations, ApplicationsPage } from '../../../pages'
import ErrorBoundary from '../../../core/ErrorBoundary';
import {
  LogoutOutlined,
  AppstoreOutlined,
  ClusterOutlined,
  ProfileOutlined,
  FontColorsOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'


const { Sider } = Layout;


const Home = (props:any) => {
      let [ collapsed, setEditMode ] = useState(true)
      let changeEditMode = () => {
          if(collapsed == false){
              setEditMode(true)
          } else {
              setEditMode(false)
          }
      }
      if(!localStorage.token || localStorage.token === undefined){
        return (
          <Redirect to='/'/>
        )
      }
      
          return (
          <ErrorBoundary>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={'12vw'}  collapsedWidth={80} collapsed={collapsed} onCollapse={changeEditMode} onMouseEnter={() => (setEditMode(false))} onMouseLeave={() => (setEditMode(true))}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
                  <Menu.Item key="1">
                    <NavLink to="/home/organizations">
                    <AppstoreOutlined />
                      <span>Organizations</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to="/home/serviceProfiles">
                    <SnippetsOutlined />
                      <span>Service Profiles</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <NavLink to="/home/applications">
                    <FontColorsOutlined />
                      <span>Applications</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to="/home/deviceProfiles">
                    <ProfileOutlined />
                      <span>Device Profiles</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <NavLink to="/home/devices">
                    <ClusterOutlined />
                      <span>Devices</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item onClick={() => props.logout()}key="6">
                    <NavLink to="/home/orders">
                    <LogoutOutlined/>
                      <span>Logout</span>
                    </NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
              <Route path="/home/organizations/" render = { () => <Organizations/>}/>
              <Route path="/home/devices" render = { () => <DevicesPage/>}/>
              <Route path="/home/serviceProfiles" render = { () => <ServiceProfilesPage/>}/>
              <Route path="/home/applications" render = { () => <ApplicationsPage/>}/>
              </Layout>
            </Layout>
            </ErrorBoundary>
          )
      }

export default Home

