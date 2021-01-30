import React, {useState, useEffect, memo} from 'react'
import ErrorBoundary from '../../../core/ErrorBoundary'
import style from './serviceProfile.module.scss'
import { Empty, Card, PageHeader, Table, Badge, Tag } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateServiceProfileForm } from '../../../modules'
import Moment from 'moment'

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
                : <>
                    {
                    serviceProfiles.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : <Table style={{padding: '25px'}} className="components-table-demo-nested" columns={[
                        { 
                            title: 'Organization name', dataIndex: 'name', key: 'id', render: text => <a>{text}</a> 
                        },
                        {
                            title: 'Network server id', width: '10%', align:'center', dataIndex: 'networkServerID', key: 'id', render: text => <Tag color='magenta'>{text}</Tag>
                        },
                        {
                            title: 'Organization id', width: '10%', align:'center', dataIndex: 'organizationID', key: 'id', render: text => <Tag color='green'>{text}</Tag>
                        },
                        { 
                            title: 'Created', width: '7%', align:'center', dataIndex: 'createdAt', key: 'id', render: date => <Tag color='geekblue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Updated',  width: '7%', align:'center', dataIndex: 'updatedAt', key: 'id', render: date => <Tag color='blue'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                    ]}
                    //expandable={{ expandedRowRender }}
                    dataSource={serviceProfiles} bordered={true}/>
                    }
                  </> 
            }
        </div>
        </ErrorBoundary>
        
    )
}

export default ServiceProfile
