'use client'
import Notification from '@/app/components/Notification/Notification'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Alert, Button, Divider, Modal, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import * as S from './styles'
import { DataType } from './types'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataTable, setDataTable] = useState<DataType[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false)

  const updateTable = () => {
    setShouldUpdateTable((prevState) => !prevState)
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '5%'
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Sobrenome',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%'
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: '10%'
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: (active) =>
        active === 1 ? <Button>Ativo</Button> : <Button danger>Inativo</Button>,
      width: '10%'
    },
    {
      title: 'Tipo de Acesso',
      dataIndex: 'accessType',
      key: 'accessType',
      width: '10%'
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (record) => <a onClick={() => console.log(record.id)}>Remover</a>,
      width: '5%'
    }
  ]

  const mapData = (data: DataType[]) => {
    return data.map((item) => ({
      ...item,
      key: item.id
    }))
  }

  const findDataTable = async () => {
    console.log('chamou a findDataTable')
    setIsLoading(true)
    try {
      setTimeout(() => {
        setDataTable(
          mapData([
            {
              id: 2,
              name: 'Paulo',
              lastName: 'Muzzy',
              email: 'paulo@muzzy.com',
              dateOfBirth: '2024-06-02',
              active: 1,
              accessType: 'adm'
            },
            {
              id: 3,
              name: 'Ana',
              lastName: 'Paula',
              email: 'paulokriger@gmail.com',
              dateOfBirth: '2024-06-02',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 4,
              name: 'Ronaldo',
              lastName: 'Messias',
              email: 'ronaldom32@gmail.com',
              dateOfBirth: '2024-06-02',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 5,
              name: 'Carlos',
              lastName: 'Silva',
              email: 'carloss@gmail.com',
              dateOfBirth: '2023-05-01',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 6,
              name: 'Maria',
              lastName: 'Santos',
              email: 'marias@gmail.com',
              dateOfBirth: '2022-04-03',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 7,
              name: 'João',
              lastName: 'Pereira',
              email: 'joaop@gmail.com',
              dateOfBirth: '2021-03-04',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 8,
              name: 'Ana',
              lastName: 'Costa',
              email: 'anac@gmail.com',
              dateOfBirth: '2020-02-05',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 9,
              name: 'Pedro',
              lastName: 'Ribeiro',
              email: 'pedror@gmail.com',
              dateOfBirth: '2019-01-06',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 10,
              name: 'Julia',
              lastName: 'Mendes',
              email: 'juliam@gmail.com',
              dateOfBirth: '2018-12-07',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 11,
              name: 'Lucas',
              lastName: 'Barros',
              email: 'lucasb@gmail.com',
              dateOfBirth: '2017-11-08',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 12,
              name: 'Beatriz',
              lastName: 'Rocha',
              email: 'beatrizr@gmail.com',
              dateOfBirth: '2016-10-09',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 13,
              name: 'Gabriel',
              lastName: 'Ferreira',
              email: 'gabrielf@gmail.com',
              dateOfBirth: '2015-09-10',
              active: 1,
              accessType: 'usr'
            },
            {
              id: 14,
              name: 'Luisa',
              lastName: 'Cardoso',
              email: 'luisac@gmail.com',
              dateOfBirth: '2014-08-11',
              active: 1,
              accessType: 'usr'
            }
          ])
        )
        setIsLoading(false)
      }, 2000)
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

  const showModal = () => {
    setModalIsOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setModalIsOpen(false)
      setConfirmLoading(false)
      updateTable()
    }, 2000)
  }

  const handleCancel = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    findDataTable()
  }, [shouldUpdateTable])

  return (
    <S.Wrapper>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Cadastrar Paciente
      </Button>
      <Divider />
      {isLoading ? (
        <Spin>
          <Alert
            message="Aguarde..."
            description="Carregando os dados."
            type="info"
          />
        </Spin>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{ pageSize: 10 }}
            style={{ width: '100%' }}
            title={() => 'Listagem de Pacientes'}
            scroll={{ y: 600 }}
          />
          <Modal
            title="Cadastro de Paciente"
            open={modalIsOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            Formulário de cadastrar paciente
          </Modal>
        </>
      )}
    </S.Wrapper>
  )
}
