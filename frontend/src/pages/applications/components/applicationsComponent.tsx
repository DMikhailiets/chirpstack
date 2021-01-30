import React, {useState, useEffect, memo} from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './applications.module.scss'
import { Empty, Card, PageHeader, Table, Badge, Tag } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateApplicationForm } from '../../../modules'
import Moment from 'moment'

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
                : <>
                    {
                    applications.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : <Table style={{padding: '25px'}} className="components-table-demo-nested" columns={[
                        { 
                            title: 'Application name', dataIndex: 'name', key: 'id', render: text => <a>{text}</a> 
                        },
                        { 
                            title: 'Description', dataIndex: 'description', key: 'id'
                        },
                        { 
                            title: 'Service profile', width: '15%', align:'center', dataIndex: 'serviceProfileName', key: 'id'
                        },
                        { 
                            title: 'Organization id', width: '9%', align:'center', dataIndex: 'organizationID', key: 'id', render: text => <Tag color='blue'>{text}</Tag>
                        },
                        { 
                            title: 'Created', width: '7%', align:'center', dataIndex: 'createdAt', key: 'id', render: date => <Tag color='geekblue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Updated',  width: '7%', align:'center', dataIndex: 'updatedAt', key: 'id', render: date => <Tag color='green'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                    ]}
                    //expandable={{ expandedRowRender }}
                    dataSource={applications} bordered={true}/>
                }</> 
            }
        </div>
    </>
        
    )
}

export default React.memo(Applications)
