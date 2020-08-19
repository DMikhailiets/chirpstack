import React, { memo, useState, useEffect } from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './devices.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'


type devicesPageProps = {
    getOrganizations: Function,
    getDevices: Function,
    organizations: any,
    devices: any,
}


const devicesPage:React.FC<devicesPageProps> = memo(({getOrganizations, organizations, devices, getDevices}, ...props) => {
    const[newDeviceFlag, setNewDeviceFlag] = useState(false)
 useEffect(() => {
    if (devices === null ){ 
        getDevices()
    }
 },[organizations, devices])
 
    return (
        <ErrorBoundary errorMessage={'errorMessage'} errorStatus={1}>
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
                                                              <>
                                                              Hi!
                                                              </>
                                                            )
                    }
                  </div> 
            }
        </div>
        </ErrorBoundary>
        
    )})

export default devicesPage

