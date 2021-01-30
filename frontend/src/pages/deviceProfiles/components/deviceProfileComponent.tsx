import React, {useState, useEffect, memo} from 'react'
import style from './deviceProfile.module.scss'
import { Empty, Card, PageHeader, Table, Tag } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { CreateApplicationForm, CreateDeviceProfileForm } from '../../../modules'
import Moment from 'moment'

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
                : <>
                    {
                    deviceProfiles.length === 0
                    ? <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}><Empty/></div> 
                    : <Table style={{padding: '25px'}} className="components-table-demo-nested" columns={[
                        { 
                            title: 'Application name', dataIndex: 'name', key: 'id', render: text => <a>{text}</a> 
                        },
                        { 
                            title: 'Network server', width: '15%', align:'center', dataIndex: 'networkServerName', key: 'id'
                        },
                        { 
                            title: 'Organization id', width: '9%', align:'center', dataIndex: 'organizationID', key: 'id', render: text => <Tag color='blue'>{text}</Tag>
                        },
                        { 
                            title: 'Created', width: '7%', align:'center', dataIndex: 'createdAt', key: 'id', render: date => <Tag color='#108ee9'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                        { 
                            title: 'Updated',  width: '7%', align:'center', dataIndex: 'updatedAt', key: 'id', render: date => <Tag color='green'>{Moment(date).format('DD.MM.YYYY')}</Tag>
                        },
                    ]}
                    //expandable={{ expandedRowRender }}
                    dataSource={deviceProfiles} bordered={true}/>
                }</> 
                 
            }
        </div>
    </>
        
    )
}

export default React.memo(DeviceProfiles)
