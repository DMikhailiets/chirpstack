import React, {useState, useEffect, memo} from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './applications.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateApplicationForm } from '../../../modules'

type applicationComponentProps = {
    createApplication: Function
    applications: [] | null,
    serviceProfiles: [] | null,
    organizations: [] | null
}

const Applications: React.FC<applicationComponentProps> = ({  organizations, createApplication, serviceProfiles, applications, ...props}) => {
    console.log(applications)
    const[newApplicationFlag, setNewApplicationFlag] = useState(false)
    return (
        <>
            {(organizations !== null && serviceProfiles !== null) ? <CreateApplicationForm 
                                                                        createApplication={createApplication}
                                                                        organizations={organizations} 
                                                                        visible={newApplicationFlag} 
                                                                        serviceProfiles={serviceProfiles}
                                                                        setNewApplicationFlag={setNewApplicationFlag}
                                                                    />   : React.Fragment         }
            <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Applications:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewApplicationFlag(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            {
                applications === null  
                ? <Card 
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}
                loading={applications === null} 
            /> 
                : <div style={{display: 'flex', flexWrap: 'wrap' }}>
                    {
                    applications.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : applications.map((application: any) => 
                                                             <Card
                                                                style={{ marginLeft: 15, marginRight: 15, marginTop: 15, width: 270 }}
                                                                title={application.name}
                                                             >
                                                                <p>id: {application.id}</p>
                                                                <p>description: {application.description}</p>
                                                                <p>organizationID: {application.organizationID}</p>
                                                                <p>serviceProfileID: {application.serviceProfileID}</p>
                                                                <p>serviceProfileName: {application.serviceProfileName}</p>
                                                            </Card>
                                                            )
                    }
                  </div> 
            }
        </div>
    </>
        
    )
}

export default React.memo(Applications)
