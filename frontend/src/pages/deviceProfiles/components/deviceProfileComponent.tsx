import React, {useState, useEffect, memo} from 'react'
import style from './deviceProfile.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateApplicationForm, CreateDeviceProfileForm } from '../../../modules'

type deviceProfilesProps = {
    createDeviceProfile: Function
    deviceProfiles: [] | null
    networkServers: [] | null
    organizations: [] | null
}

const DeviceProfiles: React.FC<deviceProfilesProps> = ({  organizations, createDeviceProfile, networkServers, deviceProfiles,  ...props}) => {
    const[newDeviceProfile, setNewDeviceProfile] = useState(false)
    return (
        <>
            {(organizations !== null && networkServers !== null) ? <CreateDeviceProfileForm 
                                                                        createDeviceProfile={createDeviceProfile}
                                                                        organizations={organizations} 
                                                                        visible={newDeviceProfile} 
                                                                        networkServers={networkServers}
                                                                        setNewDeviceProfile={setNewDeviceProfile}
                                                                    />   : React.Fragment         }
            <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Device profiles:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewDeviceProfile(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            {
                deviceProfiles === null  
                ? <Card 
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}
                loading={deviceProfiles === null} 
            /> 
                : <div style={{display: 'flex', flexWrap: 'wrap' }}>
                    {
                    deviceProfiles.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : deviceProfiles.map((deviceProfile: any) => 
                                                             <Card
                                                                style={{ marginLeft: 15, marginRight: 15, marginTop: 15, width: 270 }}
                                                                title={deviceProfile.name}
                                                             >
                                                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                                                <p>id: {deviceProfile.id}</p>
                                                                <p>organizationID: {deviceProfile.organizationID}</p>
                                                                </div>
                                                            </Card>
                                                            )
                    }
                  </div> 
            }
        </div>
    </>
        
    )
}

export default React.memo(DeviceProfiles)
