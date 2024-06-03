'use client'

import { notification as CustomNotification } from 'antd'

type NotificationProps = {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  description: string
}

export default function Notification({
  type,
  message,
  description
}: NotificationProps) {
  CustomNotification[type]({
    message,
    description
  })

  return null
}
