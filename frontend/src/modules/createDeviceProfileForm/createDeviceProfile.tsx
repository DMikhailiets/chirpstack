import React, { useState } from 'react'
import { Form, Input, Button, Tooltip, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './createApplicationForm.module.scss'
import { NumericInput } from '../../components'

const { Option } = Select

function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

type CreateDeviceProfile = {
  createDeviceProfile: Function
  setNewDeviceProfile: Function
  organizations: []
  networkServers: [] 
  visible: boolean
}




export const CreateDeviceProfileForm: React.FC<CreateDeviceProfile> = ({ organizations, visible,  createDeviceProfile, networkServers, setNewDeviceProfile, ...props}) => { 
    let networkServersOnSelect: any = []
    networkServers.forEach((networkServer: any) => networkServersOnSelect.push(<Option 
                                                                                    value={networkServer.id}
                                                                                    key={networkServer.id}
                                                                                >{networkServer.name+ ' '+ networkServer.server}
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
        console.log(values)
        createDeviceProfile(values)
        form.resetFields()
        setNewDeviceProfile(false)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    
 return(
   
  <Modal
    title="Create Device profile"
    visible={visible}
    onCancel={() => setNewDeviceProfile(false)}
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
          name="macVersion" 
          label="macVersion" 
          rules={[{ required: true, message: 'Please choise macVersion!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            <Option key={'1.0.0'} value={'1.0.0'}>1.0.0</Option>
            <Option key={'1.0.1'} value={'1.0.1'}>1.0.1</Option>
            <Option key={'1.0.2'} value={'1.0.2'}>1.0.2</Option>
            <Option key={'1.0.3'} value={'1.0.3'}>1.0.3</Option>
            <Option key={'1.1.0'} value={'1.1.0'}>1.1.0</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="regParamsRevision" 
          label="Class" 
          rules={[{ required: true, message: 'Please choise Class!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
          >
            <Option key={'A'} value={'A'}>A</Option>
            <Option key={'B'} value={'B'}>B</Option>
            
          </Select>
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
        name="supportsJoin" 
        label="Device support OTAA" 
    >    
        <Switch/>
    </Form.Item>
    <Form.Item 
        
        name="rxFreq2" 
        label="RX2 channel frequency" 
        rules={[{ required: true, message: 'Please input RX2 channel frequency!' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || /^([\d,])*$/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('Number is required!');
          }
        }),]}
    >    
   
        <Input maxLength={10}/>
     
    </Form.Item>
    {/* <Form.Item 
        
        name="factoryPresetFreqs" 
        label="Factory-preset frequencies" 
        rules={[{ required: true, message: 'Please input RX2 channel frequency!' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || /^[\d( )]*$/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('Number is required!');
          }
        }),]}
    >    
   
        <Input maxLength={10}/>
     
    </Form.Item> */}
    <Form.Item 
          name="payloadCodec" 
          label="Payload codec" 
         // rules={[{ required: true, message: 'Please choise Class!' }]}
        >      
          <Select
           // mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={''}
          >
            <Option key={'Cayenne LPP'} value={'Cayenne LPP'}>Cayenne LPP</Option>
            
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


