'use client'
import Notification from '@/app/components/Notification/Notification'
import {
  FindAllPatientsResponseProps,
  findAllPatients
} from '@/services/patient/find-all-patients'
import { DateUtils } from '@/utils/functions/formatDate'
import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import {
  Alert,
  Avatar,
  Button,
  Divider,
  Dropdown,
  Modal,
  Space,
  Spin,
  Table
} from 'antd'
import { useEffect, useState } from 'react'
import * as S from './styles'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataTable, setDataTable] = useState<FindAllPatientsResponseProps[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false)

  const updateTable = () => {
    setShouldUpdateTable((prevState) => !prevState)
  }

  const columns: TableColumnsType<FindAllPatientsResponseProps> = [
    {
      title: 'Foto',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <Avatar size="large" icon={<UserOutlined />} />,
      width: '5%'
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => `${record.name} ${record.lastName}`,
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%'
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (text, record) => DateUtils.formatDate(record.dateOfBirth),
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
      title: 'Ação',
      dataIndex: '',
      render: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <Button
                    onClick={() => console.log(record.id)}
                    danger
                    icon={<DeleteOutlined />}
                    style={{ width: '100%' }}
                  >
                    Desativar paciente
                  </Button>
                )
              }
            ]
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Abir
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
      width: '5%'
    }
  ]

  const mapData = (data: FindAllPatientsResponseProps[]) => {
    return data.map((item) => ({
      ...item,
      key: item.id
    }))
  }

  const findDataTable = async () => {
    setIsLoading(true)
    try {
      const response = await findAllPatients()
      setDataTable(response)
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      Notification({
        type: 'error',
        message: error.error,
        description: error.message || 'Ocorreu um erro ao carregar a tabela'
      })
      setDataTable([])
    }
  }

  const showModal = () => {
    setModalIsOpen(true)
  }

  const handleOk = () => {
    findDataTable()
    setModalIsOpen(false)
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
