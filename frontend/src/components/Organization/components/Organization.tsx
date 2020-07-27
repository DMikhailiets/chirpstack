import React, { useEffect } from 'react'
import { Card, Empty } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'

type OrganizationProps = {
    displayName: string,
    id: any,
    users: any,
    createdAt: any,
    getOrganizationsUsers: Function
}

const Organization: React.FC<OrganizationProps> = ({id, getOrganizationsUsers, displayName, users}) => {
    //console.log(id)
    useEffect(() => {
        if(users === null){
            getOrganizationsUsers(id)
        }
    },[])
    return (
        <Card 
            style={{ marginLeft: 15, marginRight: 15, width: 270 }}
            title={displayName} 
            extra={<PlusCircleTwoTone />} 
        >
        {
             users === null 
             ? <Empty/> 
             : <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
                 { users.map((user: any) => <p key={user.id}>user</p>) }
               </div> 
        }
      </Card>
    )
}

export default Organization