import React, { useState, useEffect } from 'react'
import { CreateOrganizationForm, CreateUserForm } from '../../../modules'
import style from './organization.module.scss'
import { Empty, Card, PageHeader } from 'antd'
import { Redirect } from 'react-router-dom'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Organization } from '../../../components/Organization'
import ErrorBoundary from '../../../core/ErrorBoundary'

type OrganizationsProps = {
    createOrganization: Function,
    getOrganizations: Function,
    organizations: any,
    createUser: Function
}

const OrganizationsPage: React.FC<OrganizationsProps> = ({createUser, createOrganization, getOrganizations, organizations}) => { 
 const[newOrganizationFlag, setNewOrganizationFlag] = useState(false)
 useEffect(() => {
    if (organizations.length === 0) {
       getOrganizations() 
    }
 },[organizations])
 
    return (
        <ErrorBoundary errorMessage={'errorMessage'} errorStatus={1}>
            <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Organizations:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewOrganizationFlag(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            <CreateOrganizationForm getOrganizations={getOrganizations} createOrganization={createOrganization} setNewOrganizationFlag={setNewOrganizationFlag}visible={newOrganizationFlag}/>
            {
                organizations === null 
                ? <Card 
                style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}
                loading={organizations === null} 
            /> 
                : <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                    organizations.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : organizations.map((organization: any) => 
                                                              <Organization 
                                                                    createUser={createUser}
                                                                    getOrganizations={getOrganizations}
                                                                    organizations={organizations}
                                                                    key={organization.id}
                                                                    id={organization.id} 
                                                                    displayName={organization.displayName} 
                                                                    createdAt={organization.createdAt}
                                                              />
                                                            )
                    }
                  </div> 
            }
        </div>
        </ErrorBoundary>
        
    )
}

export default OrganizationsPage

