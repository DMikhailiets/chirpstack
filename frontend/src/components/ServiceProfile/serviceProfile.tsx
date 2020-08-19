import React, { useEffect, useState } from 'react'
import { Card, Empty } from 'antd'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'


type OrganizationProps = {
    
}

const ServiceProfile: React.FC<OrganizationProps> = ({}) => {
    return (
        <ErrorBoundary>
            <Card 
            style={{ marginLeft: 15, marginRight: 15, width: 270 }}
            title={displayName} 
            loading={users[id] === undefined} 
        >
        
      </Card>
          
        </ErrorBoundary>
    )
}

export default ServiceProfile