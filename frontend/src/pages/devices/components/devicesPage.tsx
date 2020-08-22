import React, { memo, useState, useEffect } from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './devices.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateDeviceForm } from '../../../modules'


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
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}
                loading={devices === null} 
            /> 
                : <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                    devices.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : devices.map((device: any) => 
                    <Card
                    style={{ marginLeft: 15, marginRight: 15, marginTop: 15, width: '20vw' }}
                    title={device.name}
                    type="inner" 
                 >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                       <p>devEUI: {device.devEUI}</p>  
                       <p>name: {device.name}</p>
                       <p>applicationID: {device.applicationID}</p>
                       <p>description: {device.description}</p>
                       <p>deviceProfileName: {device.deviceProfileName}</p>
                       <p>deviceStatusBattery: {device.deviceStatusBattery}</p>
                       <p>deviceStatusMargin: {device.deviceStatusMargin}</p>
                       <p>deviceStatusExternalPowerSource: {device.deviceStatusExternalPowerSource}</p>
                       <p>deviceStatusExternalPowerSource: {device.deviceStatusExternalPowerSource}</p>
                       <p>deviceStatusBatteryLevelUnavailable: {device.deviceStatusBatteryLevelUnavailable}</p>
                       <p>deviceStatusBatteryLevel: {device.deviceStatusBatteryLevel}</p>
                       <p>lastSeenAt: {device.lastSeenAt}</p>
                    </div>
                    

                </Card>
                                                            )
                    }
                  </div> 
            }
        </div>
        </ErrorBoundary>
        
    )})

export default React.memo(devicesPage)

