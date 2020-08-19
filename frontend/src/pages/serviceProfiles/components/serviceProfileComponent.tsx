import React, {useState, useEffect, memo} from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './serviceProfile.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateServiceProfileForm } from '../../../modules'

type ServiceProfileProps = {
    getServiceProfiles: Function,
    createServiceProfile: Function,
    getNetworkServers: Function,
    getOrganizations: Function,
    networkServers: [] | null,
    serviceProfiles: [] | null,
    organizations: [] | null
}

const ServiceProfile: React.FC<ServiceProfileProps> = ({getOrganizations, organizations,  getServiceProfiles, createServiceProfile, getNetworkServers, serviceProfiles, networkServers, ...props}) => {
    const[newServiceProfileFlag, setNewServiceProfileFlag] = useState(false)
    useEffect(() => {
        getOrganizations()
        getNetworkServers()
        getServiceProfiles()
    },[])
    return (
        <ErrorBoundary errorMessage={'errorMessage'} errorStatus={1}>
            {(networkServers !== null && organizations !== null) ? <CreateServiceProfileForm getServiceProfiles={getServiceProfiles} organizations={organizations} visible={newServiceProfileFlag} createServiceProfile={createServiceProfile} networkServers={networkServers} setNewServiceProfileFlag={setNewServiceProfileFlag}/>   : React.Fragment         }
            <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Service profiles:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewServiceProfileFlag(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            {
                serviceProfiles === null  
                ? <Card 
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}
                loading={serviceProfiles === null} 
            /> 
                : <div style={{display: 'flex', flexWrap: 'wrap' }}>
                    {
                    serviceProfiles.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : serviceProfiles.map((serviceProfile: any) => 
                                                             <Card
                                                                style={{ marginLeft: 15, marginRight: 15, marginTop: 15, width: 270 }}
                                                                title={serviceProfile.name}
                                                             >
                                                                 
                                                                 <p>networkServerID: {serviceProfile.networkServerID}</p>
                                                                 <p>organizationID: {serviceProfile.organizationID}</p>
                                                            </Card>
                                                            )
                    }
                  </div> 
            }
        </div>
        </ErrorBoundary>
        
    )
}

export default ServiceProfile
