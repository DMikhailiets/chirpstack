import React, {useState} from 'react'
import { Form, Input, Button, Checkbox,  Row, Col, Layout } from 'antd'
import style from './login.module.scss'
import { Block } from '../../../components'
import notification from '../../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'

const LoginForm = (props: any) => {
  const[disabled, setButtonType] = useState(false)
  if(localStorage.token){//localStorage.token
    return <Redirect to='/home'/>
  }
  const onFinish = (values: any) => {
    setButtonType(true)
    props.loginUser(values)
    .then((data: any) => {
      console.log('hi')
  }).finally(() => setButtonType(false))
}
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout className={style.content_wrapper} style={{ minHeight: '100vh' }}>
      <Row>
        <Col span={8}></Col>  
        <Col className={style.login_form_wrapper} span={8}>
          <Block className={style.block}>
              <div>
                <h2>Join your account</h2>
              </div> 
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item 
                >
                  <Button type="primary" htmlType="submit" disabled={disabled}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>        
          </Block>
          
        </Col>  
        <Col span={8}></Col>  
      </Row> 
    </Layout>
  )
}

export default LoginForm