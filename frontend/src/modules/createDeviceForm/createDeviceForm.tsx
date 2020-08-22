import React, { useState } from 'react'
import { Form, Input, Button, Tooltip, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './createDeviceForm.module.scss'


const { Option } = Select

function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

type CreateDeviceProps = {
  createDevice: Function
  setNewDeviceFlag: Function
  applications: []
  deviceProfiles: [] 
  visible: boolean
}




export const CreateDeviceForm: React.FC<CreateDeviceProps> = ({ applications, visible,  createDevice, deviceProfiles, setNewDeviceFlag, ...props}) => { 
    let applicationsOnSelect: any = []
    applications.forEach((application: any) => applicationsOnSelect.push(<Option 
                                                                                    value={application.id}
                                                                                    key={application.id}
                                                                                >{application.name}
                                                                                </Option>))
    const [form] = Form.useForm()  
    const deviceProfilesOnSelect: any = []
    deviceProfiles.forEach((devicaProfile: any) => deviceProfilesOnSelect.push(<Option 
                                                                                value={devicaProfile.id}
                                                                                key={devicaProfile.id}
                                                                            >{devicaProfile.name}
                                                                            </Option>))
    const[disabled, setButtonType] = useState(false)

    const onFinish = (values: any) => {
        console.log(values)
        createDevice(values)
        form.resetFields()
        setNewDeviceFlag(false)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }   
 return(  
  <Modal
    title="Create Device "
    visible={visible}
    onCancel={() => setNewDeviceFlag(false)}
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
        
        name="devEUI" 
        label="devEUI" 
        rules={[{ required: true, message: 'Please input devEUI!' },
        () => ({
          validator(rule, value) {
            if (!value || /^([\dabcdef])*$/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('devEUI is hex consists of 16 symbols!');
          }
        }),]}
    >    
   
        <Input maxLength={16} minLength={16}/>
     
    </Form.Item>
    <Form.Item 
        name="description" 
        label="description" 
        rules={[]}
    >    
     <Input />
    </Form.Item>
    <Form.Item 
          name="applicationID" 
          label="applicationID" 
          rules={[{ required: true, message: 'Please choise applicationID!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            {applicationsOnSelect}
          </Select>
        </Form.Item>
        <Form.Item 
          name="deviceProfileID" 
          label="deviceProfileID" 
          rules={[{ required: true, message: 'Please choise deviceProfileID!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            {deviceProfilesOnSelect}
          </Select>
        </Form.Item>     
    {/* <Form.Item  
        name="referenceAltitude" 
        label="referenceAltitude" 
        rules={[{ required: true, message: 'Please input referenceAltitude!' },
        ]}
    >    
        <Input />
    </Form.Item> */}
    <Form.Item  >
        <Button type="primary" htmlType="submit" disabled={disabled}>
          Allow
        </Button>
      </Form.Item>
    </Form>        
</Modal>    
 )
}


