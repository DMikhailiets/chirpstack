import React, { useState, useEffect } from 'react'
import { CreateOrganizationForm } from '../../../modules'
import style from './organization.module.scss'
import { Empty, PageHeader } from 'antd'
import { Redirect } from 'react-router-dom'
import { PlusCircleTwoTone } from '@ant-design/icons'

type OrganizationsProps = {
    createOrganization: Function,
    getOrganizations: Function,
    organizations: any
}

const Organization: React.FC<OrganizationsProps> = ({createOrganization, getOrganizations, organizations}) => { 
 const[newOrganizationFlag, setNewOrganizationFlag] = useState(false)
 useEffect(() => {
    if (organizations === null) {
       //getOrganizations() 
    }
 },[organizations])
    return (
        <div className={style.content_wrapper}>
            <PageHeader
              className="site-page-heade"
              title="Organizations:"
              subTitle={<PlusCircleTwoTone onClick={() => setNewOrganizationFlag(true)}
              style={{backgroundSize: '450px'}}/>}
            /> 
            
            <CreateOrganizationForm setNewOrganizationFlag={setNewOrganizationFlag}visible={newOrganizationFlag}/>
            {
                organizations == null 
                ? <Empty/> 
                : <div>organizations list</div> 
            }
        </div>
    )
}

export default Organization

