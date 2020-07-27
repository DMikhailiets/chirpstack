import React, { useState, useEffect } from 'react'
import { CreateOrganizationForm } from '../../../modules'
import style from './organization.module.scss'
import { Empty, PageHeader } from 'antd'
import { Redirect } from 'react-router-dom'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Organization } from '../../../components/Organization'
import ErrorBoundary from '../../../core/ErrorBoundary'

type OrganizationsProps = {
    createOrganization: Function,
    getOrganizations: Function,
    organizations: any
}

const OrganizationsPage: React.FC<OrganizationsProps> = ({createOrganization, getOrganizations, organizations}) => { 
 const[newOrganizationFlag, setNewOrganizationFlag] = useState(false)
 useEffect(() => {
    if (organizations === null) {
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
            
            <CreateOrganizationForm setNewOrganizationFlag={setNewOrganizationFlag}visible={newOrganizationFlag}/>
            {
                organizations === null 
                ? <Empty/> 
                : <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {organizations.map((organization: any) => 
                                                              <Organization 
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

