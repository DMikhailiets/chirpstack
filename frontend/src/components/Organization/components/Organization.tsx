import React, { useEffect, useState } from 'react'
import { Card, Empty } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { CreateUserForm } from '../../../modules'

type OrganizationProps = {
    displayName: string,
    id: any,
    users: any,
    createdAt: any,
    getOrganizationsUsers: Function,
    getOrganizations: Function,
    organizations: any,
    createUser: Function
}

const Organization: React.FC<OrganizationProps> = ({id, createUser, getOrganizations, getOrganizationsUsers, displayName, organizations, users}) => {
    const[newUserVisible, setNewUserFormVisible] = useState(false)
    useEffect(() => {
        if(users[id] === undefined ){
            getOrganizationsUsers(id)
        }
    },[])
    return (
        <ErrorBoundary>
            <Card 
            style={{ marginLeft: 15, marginRight: 15, width: 270 }}
            title={displayName} 
            extra={<PlusCircleTwoTone onClick={() => setNewUserFormVisible(true)}/>}
            loading={users[id] === undefined} 
        >
        {
              users[id] === undefined 
             ? <></> 
             : <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
                 {  
                    users[id].users.length === 0
                    ? <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE} />  
                    : users[id].users.map((user: any) => <p key={user.id}>{user.email}</p>) 
                 }
               </div> 
        }
      </Card>
            <CreateUserForm createUser={createUser} getOrganizations={getOrganizations} visible={newUserVisible} setNewUserFormVisible={setNewUserFormVisible} organizations={organizations}/>
        </ErrorBoundary>
    )
}

export default Organization