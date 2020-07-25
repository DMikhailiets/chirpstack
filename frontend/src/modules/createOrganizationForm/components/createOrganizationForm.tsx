import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './form.module.scss'
import { Block } from '../../../components'
import notification from '../../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'

const { Option } = Select

type CreateOrganizationType = {
  visible: boolean,
  createOrganization: Function,
  setNewOrganizationFlag: Function
}

const CreateOrganizationForm: React.FC<CreateOrganizationType> = ({visible, createOrganization, setNewOrganizationFlag}) => { 
    const[disabled, setButtonType] = useState(false)
    // const[canHaveGateways, setCanHaveGateways] = useState(false)
    // const setCanHaveGateways = () => {

    // }
    const onFinish = (values: any) => {
        setButtonType(true)
        console.log(values)
        createOrganization(values).then((data: any) => {
          console.log(data)
            if(data === undefined){
              setButtonType(false)
              notification({
                text: "Incorrect email or password!",
                type: 'error',
                title: "Oops..."
              })
            }else{
              //window.location.reload();
              setButtonType(false)
              notification({
                text: "nice to meet you!)",
                type: 'success',
                title: "Success!",
                duration: 5
              })
            }
      }).catch (
      //     notification({
      //       text: "Oops...",
      //       type: 'error',
      //       title: "Oops..."
      //     })
       )
    }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
    
 return(
  <Modal
    title="Create organization"
    visible={visible}
    onOk={onFinish}
    okText={'Allow'}
    onCancel={() => setNewOrganizationFlag(false)}
> 
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
            <Form.Item 
                name="canHaveGateways" 
                label="canHaveGateways" 
               // rules={[{ }]}
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
              <Form.Item
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
              </Form.Item>
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
            </Form>        
</Modal>
        
 )
}

export default CreateOrganizationForm

