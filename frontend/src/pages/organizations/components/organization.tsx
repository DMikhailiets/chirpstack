import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Switch, Select, Row, Col, Layout } from 'antd'
import style from './organization.module.scss'
import { Block } from '../../../components'
import notification from '../../../components/Notification'
import { NavLink, Redirect } from 'react-router-dom'
import { CreateOrganizationForm } from '../../../modules'
const { Option } = Select

const Organization: React.FC = (props: any) => { 
    
 return(   <CreateOrganizationForm/>
 )
}

export default Organization

