import React, { useState } from 'react'
import { Form, Input, Button, Tooltip, Switch, Modal, Select, Row, Col, Layout } from 'antd'
import style from './createApplicationForm.module.scss'
import { NumericInput } from '../../components'
import TextArea from 'antd/lib/input/TextArea'

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

const decoderString = `
// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes, variables) {
  return {};
}`
const encoderString = `
// Encode encodes the given object into an array of bytes.
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an array of bytes, e.g. [225, 230, 255, 0]
function Encode(fPort, obj, variables) {
  return [];
}`

export const CreateDeviceProfileForm: React.FC<CreateDeviceProfile> = ({ organizations, visible,  createDeviceProfile, networkServers, setNewDeviceProfile, ...props}) => { 
  const [isCustomCodacVisible, setIsCustomCodacVisible] = useState(false)  
  // const [decoderString, setDecoderString] = useState(`
  let networkServersOnSelect: any = []
    networkServers.forEach((networkServer: any) => networkServersOnSelect.push(
      <Option value={networkServer.id}  key={networkServer.id}>
        {networkServer.name+ ' '+ networkServer.server}
      </Option>))
    const [form] = Form.useForm()  
    const organizationsOnSelect: any = []
    organizations.forEach((organization: any) => organizationsOnSelect.push(
      <Option value={organization.id} key={organization.id}>
        {organization.displayName}
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
      initialValues={{
        payloadDecoderScript: decoderString,
        payloadEncoderScript: encoderString
      }}
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
   
   <Select
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
            defaultValue={[]}
    >
            <Option key={'868100000'} value={'868100000'}>868100000</Option>
            <Option key={'868300000'} value={'868300000'}>868300000</Option>
            <Option key={'868500000'} value={'868500000'}>868500000</Option>
            <Option key={'867100000'} value={'867100000'}>867100000</Option>
            <Option key={'867300000'} value={'867300000'}>867300000</Option>
            <Option key={'867500000'} value={'867500000'}>867500000</Option>
            <Option key={'867700000'} value={'867700000'}>867700000</Option>
            <Option key={'867900000'} value={'867900000'}>867900000</Option>
          </Select>
     
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
            <Option key={'Cayenne LPP'} value={'CAYENNE_LPP'}>
              <p onClick={() => setIsCustomCodacVisible(false)}>Cayenne LPP</p>
            </Option>
            <Option key={'None'} value={''}>
              <p onClick={() => setIsCustomCodacVisible(false)}>None</p>
            </Option>
            <Option key={'Custom'} value={'CUSTOM_JS'} >
              <p onClick={() => setIsCustomCodacVisible(!isCustomCodacVisible)}>Custom JavaScript codec functions</p>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
        {
            isCustomCodacVisible ?
            <>
            <Form.Item
              name="payloadDecoderScript"
              label="Payload decoder script" 
            >
              <TextArea
                autoSize={{ minRows: 10, maxRows: 500 }}
              />
            </Form.Item>
            <Form.Item
              name="payloadEncoderScript"
              label="Payload encoder script" 
            >
              <Input.TextArea
                autoSize={{ minRows: 10, maxRows: 500 }}
              />
            </Form.Item>
          
            </>
             : <></>
          }
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


