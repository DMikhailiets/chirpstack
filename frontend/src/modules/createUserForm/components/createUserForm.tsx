import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Option } = Select

type CreateOrganizationType = {
  visible: boolean,
  createUser: Function,
  setNewUserFormVisible: Function,
  organizations: any,
  getOrganizations: Function
}

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const CreateUserForm: React.FC<CreateOrganizationType> = ({getOrganizations, organizations = [], visible, createUser, setNewUserFormVisible}) => { 
  const [form] = Form.useForm()  
  const[disabled, setButtonType] = useState(false)
  const children: any = []
  organizations.forEach((organization: any) => children.push(<Option value={organization.id}key={organization.id}>{organization.displayName}</Option>))
  
  const onFinish = (values: any) => {
    createUser(values)
    form.resetFields()
    setNewUserFormVisible(false)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }  

  return(
  <Modal
    title="Create User"
    visible={visible}
    onCancel={() => setNewUserFormVisible(false)}
    footer={false}
  > 
     <Form
      form={form}
      name="createUserForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item 
          name="Organizations" 
          label="Organizations" 
          rules={[{ required: true, message: 'Please choise organization!' }]}
        >      
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
            defaultValue={[]}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, 
                    type: 'email',
                    message: 'Incorrect email' 
                  }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
        </Form.Item>
        {/* <Form.Item 
          name="isActive" 
          label="isActive" 
          rules={[{required: true }]}
        >    
          <Switch/>
        </Form.Item>
        <Form.Item 
          name="isAdmin" 
          label="isAdmin" 
        >    
          <Switch/>
        </Form.Item> */}
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            disabled={disabled}
          >
            Allow
          </Button>
        </Form.Item>
    </Form>        
</Modal>
        
 )
}



export default CreateUserForm

