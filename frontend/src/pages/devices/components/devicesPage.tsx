import React, { memo, useState, useEffect } from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './devices.module.scss'
import { Empty, Card, PageHeader, Table, Tag, Badge } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateDeviceForm } from '../../../modules'
import Moment from 'moment'

type devicesPageProps = {
    getApplications: Function,
    getDevices: Function,
    createDevice: Function,
    getDeviceProfiles: Function,
    applications: [] | null,
    devices: [] | null,
    deviceProfiles: [] | null
}


const devicesPage:React.FC<devicesPageProps> = memo(({getApplications, applications, devices, getDevices, createDevice, getDeviceProfiles, deviceProfiles}, ...props) => {
    const[newDeviceFlag, setNewDeviceFlag] = useState(false)
 useEffect(() => {
    getApplications()
    getDevices()
    getDeviceProfiles()
 },[])
 
    return (
        <ErrorBoundary errorMessage={'errorMessage'} errorStatus={1}>
            {(applications !== null && deviceProfiles !== null) ? <CreateDeviceForm 
                                                                        createDevice={createDevice}
                                                                        applications={applications} 
                                                                        visible={newDeviceFlag} 
                                                                        deviceProfiles={deviceProfiles}
                                                                        setNewDeviceFlag={setNewDeviceFlag}
                                                                    />   : React.Fragment         }
            <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Devices:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewDeviceFlag(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            {
                devices === null  
                ? <Card 
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '100vh' }}
                loading={devices === null} 
            /> 
                : <>
                    {
                    devices.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : <Table style={{padding: '25px'}} className="components-table-demo-nested" columns={[
                        { 
                            title: 'Device name', dataIndex: 'name', key: 'id', render: text => <a>{text}</a> 
                        },
                        { 
                            title: 'Description', dataIndex: 'description', key: 'id'
                        },
                        { 
                            title: 'Device profile', width: '9%', align:'center', dataIndex: 'deviceProfileName', key: 'id'
                        },
                        { 
                            title: 'Device EUI', width: '9%', align:'center', dataIndex: 'devEUI', key: 'id'
                        },
                        {
                            title: 'Device status external power source', width: '10%', align:'center', dataIndex: 'deviceStatusExternalPowerSource', key: 'canHaveGateways', render: text => text ? <span><Badge status="success"/>Yes</span> : <span><Badge status="error"/>No</span>,
                        },
                        {
                            title: 'Device status battery level unavailable', width: '10%', align:'center', dataIndex: 'deviceStatusExternalPowerSource', key: 'canHaveGateways', render: text => text ? <span><Badge status="success"/>Yes</span> : <span><Badge status="error"/>No</span>,
                        },
                        { 
                            title: 'Application id', width: '9%', align:'center', dataIndex: 'applicationID', key: 'id',  render: text => <Tag color='blue'>{text}</Tag>
                        },
                        { 
                            title: 'Status battery', width: '7%', align:'center', dataIndex: 'deviceStatusBattery', key: 'id', render: text => <Tag color='purple'>{text}</Tag>
                        },
                        { 
                            title: 'Battery level', width: '7%', align:'center', dataIndex: 'deviceStatusBatteryLevel', key: 'id', render: text => <Tag color='volcano'>{text}</Tag>
                        },
                        { 
                            title: 'Status margin', width: '7%', align:'center', dataIndex: 'deviceStatusMargin', key: 'id', render: text => <Tag color='cyan'>{text}</Tag>
                        },
                        { 
                            title: 'Last seen', width: '7%', align:'center', dataIndex: 'lastSeenAt', key: 'id', render: date => <Tag color='green'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Created', width: '7%', align:'center', dataIndex: 'createdAt', key: 'id', render: date => <Tag color='geekblue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Updated',  width: '7%', align:'center', dataIndex: 'updatedAt', key: 'id', render: date => <Tag color='blue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                    ]}
                    //expandable={{ expandedRowRender }}
                    dataSource={devices} bordered={true}/>
                }</>                     
                    }
                  </div>
        </ErrorBoundary>
    )})

export default React.memo(devicesPage)

