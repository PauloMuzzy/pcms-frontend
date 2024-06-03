'use client'

import Notification from '@/app/components/Notification/Notification'

import type { TableColumnsType } from 'antd'
import { Alert, Button, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import {
  FindAllUsersResponseProps,
  findAllUsers
} from '@/services/user/find-all-users'

type UserTableProps = {
  shouldUpdate: boolean
}

type DataType = {
  key: React.Key
  name: string
  lastName: string
  email: string
  dateOfBirth: string
  active: number
  accessType: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Sobrenome',
    dataIndex: 'lastName',
    key: 'lastName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Data de Nascimento',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth'
  },
  {
    title: 'Ativo',
    dataIndex: 'active',
    key: 'active',
    render: (active) =>
      active === 0 ? <Button>Ativo</Button> : <Button danger>Inativo</Button>
  },
  {
    title: 'Tipo de Acesso',
    dataIndex: 'accessType',
    key: 'accessType'
  },
  {
    title: 'Action',
    dataIndex: '',
    render: (record) => <a onClick={() => console.log(record.key)}>Remover</a>
  }
]

function mapData(data: FindAllUsersResponseProps[]) {
  return data.map((item) => ({
    ...item,
    key: item.id
  }))
}

export default function UsersTable({ shouldUpdate }: UserTableProps) {
  const [dataTable, setDataTable] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.active === 0
    })
  }

  async function renderTable() {
    setIsLoading(true)
    try {
      const response = await findAllUsers()
      setDataTable(mapData(response))
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      Notification({
        type: 'error',
        message: 'Erro ao carregar tabela',
        description: error.message || 'Ocorreu um erro ao carregar a tabela'
      })
      setDataTable([])
    }
  }

  useEffect(() => {
    renderTable()
  }, [shouldUpdate])

  return (
    <S.Wrapper>
      {isLoading ? (
        <Spin>
          <Alert
            message="Carregando"
            description="Arguarde um momento, estamos carregando os dados."
            type="info"
          />
        </Spin>
      ) : (
        <Table
          columns={columns}
          dataSource={dataTable}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection
          }}
        />
      )}
    </S.Wrapper>
  )
}
