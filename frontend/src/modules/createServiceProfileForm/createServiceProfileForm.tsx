import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from 'createServiceProfileForm.module.scss'
import { Block } from '../../components'
import notification from '../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'

const { Option, OptGroup } = Select

function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

type CreateOrganizationType = {
  createServiceProfile: Function
  setNewServiceProfileFlag: Function
  getServiceProfiles: Function
  networkServers: []
  organizations: []
  visible: boolean
}


export const CreateServiceProfileForm: React.FC<CreateOrganizationType> = ({ getServiceProfiles, organizations, visible, networkServers, createServiceProfile, setNewServiceProfileFlag}) => { 
    let networkServersOnSelect: any = []
    networkServers.forEach((networkServer: any) => networkServersOnSelect.push(<Option value={networkServer.id}key={networkServer.id}>{networkServer.name+ ' '+ networkServer.server}</Option>))
    const [form] = Form.useForm()  
    const organizationsOnSelect: any = []
    organizations.forEach((organization: any) => organizationsOnSelect.push(<Option value={organization.id}key={organization.id}>{organization.displayName}</Option>))
    const[disabled, setButtonType] = useState(false)
    
    const onFinish = (values: any) => {
      createServiceProfile(values).then(
        getServiceProfiles()
      )
      form.resetFields()
      setNewServiceProfileFlag(false)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    
 return(
   
  <Modal
    title="Create Service profile"
    visible={visible}
    onCancel={() => setNewServiceProfileFlag(false)}
    footer={false}
  > 
    <Form
      form={form}
      name="serviceProfileForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Form.Item 
        name="addGWMetaData" 
        label="addGWMetaData" 
    >    
        <Switch defaultChecked={false}/>
    </Form.Item>
    <Form.Item 
        name="nwkGeoLoc" 
        label="nwkGeoLoc" 
    >    
        <Switch defaultChecked={false}/>
    </Form.Item>
    <Form.Item
      label="name"
      name="name"
      rules={[{ required: true, message: 'Please input name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item 
          name="networkServerID" 
          label="networkServerID" 
          rules={[{ required: true, message: 'Please choise networkServerID!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            {networkServersOnSelect}
          </Select>
        </Form.Item>
        <Form.Item 
          name="organizationID" 
          label="organizationID" 
          rules={[{ required: true, message: 'Please choise organizationID!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            {organizationsOnSelect}
          </Select>
        </Form.Item>
      <Form.Item 
      >
        <Button type="primary" htmlType="submit" disabled={disabled}>
          Allow
        </Button>
      </Form.Item>
    </Form>        
</Modal>
        
 )
}


