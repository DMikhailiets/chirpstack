import React from 'react'
import { notification } from "antd"

export default ({ text = '', type = "info", title = '', duration = 3 }) =>
  notification[type]({
    message: title,
    description: text,
    duration: duration,
    //icon: <CheckCircleTwoTone twoToneColor="#52c41a" />
});