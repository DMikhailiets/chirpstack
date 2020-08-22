import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './createApplicationForm.module.scss'
import { Block } from '../../components'
import notification from '../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'

const { Option, OptGroup } = Select

function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

type CreateApplicationType = {
  createApplication: Function
  setNewApplicationFlag: Function
  organizations: []
  serviceProfiles: []
  visible: boolean
}


export const CreateApplicationForm: React.FC<CreateApplicationType> = ({ organizations, visible, serviceProfiles, createApplication, setNewApplicationFlag}) => { 
    let serviceProfilesOnSelect: any = []
    serviceProfiles.forEach((serviceProfile: any) => serviceProfilesOnSelect.push(<Option 
                                                                                    value={serviceProfile.id}
                                                                                    key={serviceProfile.id}
                                                                                  >{serviceProfile.name}
                                                                                  </Option>))
    const [form] = Form.useForm()  
    const organizationsOnSelect: any = []
    organizations.forEach((organization: any) => organizationsOnSelect.push(<Option 
                                                                                value={organization.id}
                                                                                key={organization.id}
                                                                            >{organization.displayName}
                                                                            </Option>))
    const[disabled, setButtonType] = useState(false)
    
    const onFinish = (values: any) => {
        createApplication(values)
        form.resetFields()
        setNewApplicationFlag(false)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    
 return(
   
  <Modal
    title="Create Application"
    visible={visible}
    onCancel={() => setNewApplicationFlag(false)}
    footer={false}
  > 
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Form.Item 
        name="name" 
        label="name" 
        rules={[{ required: true, message: 'Please input name!' }]}
    >    
     <Input />
    </Form.Item>
    <Form.Item 
        name="description" 
        label="description" 
        rules={[{ required: true, message: 'Please input description!' }]}
    >    
     <Input />
    </Form.Item>
    <Form.Item 
          name="serviceProfileID" 
          label="serviceProfileID" 
          rules={[{ required: true, message: 'Please choise serviceProfileID!' }]}
        >      
          <Select
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            {serviceProfilesOnSelect}
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


