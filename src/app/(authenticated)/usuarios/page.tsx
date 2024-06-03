'use client'
import { Divider } from 'antd'
import * as S from './styles'

import CreateUserModal from '@/app/(authenticated)/usuarios/CreateUserModal/CreateUserModal'
import UsersTable from '@/app/(authenticated)/usuarios/UsersTable/UsersTable'
import { useState } from 'react'

export default function Page() {
  const [update, setUpdate] = useState(false)
  const handleUserCreateed = () => {
    setUpdate((prevState) => !prevState)
  }
  return (
    <S.Wrapper>
      <CreateUserModal onUserCreateed={handleUserCreateed} />
      <Divider />
      <UsersTable shouldUpdate={update} />
    </S.Wrapper>
  )
}
