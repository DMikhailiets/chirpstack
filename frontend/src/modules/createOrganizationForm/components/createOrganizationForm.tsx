import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './form.module.scss'
import { Block } from '../../../components'
import notification from '../../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'

const { Option } = Select

type CreateOrganizationType = {
  visible: boolean,
  createOrganization: Function,
  setNewOrganizationFlag: Function,
  getOrganizations: Function
}


const CreateOrganizationForm: React.FC<CreateOrganizationType> = ({getOrganizations, visible, createOrganization, setNewOrganizationFlag}) => { 
  const [form] = Form.useForm()  
  const[disabled, setButtonType] = useState(false)
    // const[canHaveGateways, setCanHaveGateways] = useState(false)
    // const setCanHaveGateways = () => {

    // }
    const onFinish = (values: any) => {
      createOrganization(values)
      getOrganizations()
      form.resetFields()
      setNewOrganizationFlag(false)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    
 return(
   
  <Modal
    title="Create organization"
    visible={visible}
    onCancel={() => setNewOrganizationFlag(false)}
    footer={false}
  > 
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Form.Item 
        name="canHaveGateways" 
        label="canHaveGateways" 
    >    
    <Switch />
    </Form.Item>
      <Form.Item
        label="displayName"
        name="displayName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="id"
        name="id"
        rules={[{ required: true, message: 'Number is required!' },
        () => ({
          validator(rule, value) {
            console.log(typeof(parseInt(value)))
            if (!value || parseInt(value) > 0 ) {
              
              return Promise.resolve();
            }
            return Promise.reject('Number required!')
          },
        })
        ]}
      >
        <Input/>
      </Form.Item> */}
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item 
      > 
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



export default CreateOrganizationForm

