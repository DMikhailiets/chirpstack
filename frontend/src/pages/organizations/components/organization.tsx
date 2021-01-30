import React, { useState, useEffect } from 'react'
import { CreateOrganizationForm, CreateUserForm } from '../../../modules'
import style from './organization.module.scss'
import { Empty, Card, PageHeader, Table, Badge, Tag } from 'antd'
import { Redirect } from 'react-router-dom'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Organization } from '../../../components/Organization'
import ErrorBoundary from '../../../core/ErrorBoundary'
import Moment from 'moment'
type OrganizationsProps = {
    createOrganization: Function,
    getOrganizations: Function,
    organizations: any,
    createUser: Function
}

const OrganizationsPage: React.FC<OrganizationsProps> = ({createUser, createOrganization, getOrganizations, organizations}) => { 
 const[newOrganizationFlag, setNewOrganizationFlag] = useState(false)
 const[newUserVisible, setNewUserFormVisible] = useState(false)
 useEffect(() => {
    if (!organizations) {
       getOrganizations() 
    }
 },[organizations])
 
    return (
        <ErrorBoundary errorMessage={'errorMessage'} errorStatus={1}>
            
            <div className={style.content_wrapper}>
                <PageHeader className="site-page-heade" title="Organizations:" subTitle={<PlusCircleTwoTone onClick={() => setNewOrganizationFlag(true)} style={{backgroundSize: '450px'}}/>}/> 
                <CreateOrganizationForm getOrganizations={getOrganizations} createOrganization={createOrganization} setNewOrganizationFlag={setNewOrganizationFlag}visible={newOrganizationFlag}/>
                {
                organizations === null 
                ? <Card style={{ marginLeft: 15, marginRight: 15, width: '100%', height: '80vh' }}loading={organizations === null} /> 
                : <> 
                {
                    organizations.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : <Table style={{padding: '25px'}} className="components-table-demo-nested" columns={[
                        { 
                            title: 'Organization name', dataIndex: 'name', key: 'id', render: text => <a>{text}</a> 
                        },
                        {
                            title: 'Can have gateways', width: '10%', align:'center', dataIndex: 'canHaveGateways', key: 'canHaveGateways', render: text => text ? <span><Badge status="success"/>Yes</span> : <span><Badge status="error"/>No</span>,
                        },
                        {
                            title: 'Create user', width: '10%', align:'center', key: 'canHaveGateways', render: text => <PlusCircleTwoTone onClick={() => setNewUserFormVisible(true)}/>
                        },
                        { 
                            title: 'Created', width: '7%', align:'center', dataIndex: 'createdAt', key: 'id', render: date => <Tag color='geekblue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Updated',  width: '7%', align:'center', dataIndex: 'updatedAt', key: 'id', render: date => <Tag color='blue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                    ]}
                    //expandable={{ expandedRowRender }}
                    dataSource={organizations} bordered={true}/>
                }</> 
                }
                {
                    organizations 
                    ? <CreateUserForm createUser={createUser} getOrganizations={getOrganizations} visible={newUserVisible} setNewUserFormVisible={setNewUserFormVisible} organizations={organizations}/>
                    : <></>
                }
            </div>
        </ErrorBoundary>
    )
}

export default OrganizationsPage

