'use client'

import Menu from '@/app/components/Menu/Menu'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import { useState } from 'react'
import * as S from './styles'

export default function DrawerMenu() {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Space>
        <S.Button icon={<MenuOutlined />} onClick={showDrawer} size="large" />
      </Space>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        style={{ width: '256px', background: '#001529' }}
      >
        <S.Wrapper>
          <S.UserWrapper>
            <S.Avatar size="large">SM</S.Avatar>
          </S.UserWrapper>
          <Menu />
        </S.Wrapper>
      </Drawer>
    </>
  )
}
