'use client'

import { Button, Divider, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import Notification from '@/app/components/Notification/Notification'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { DatePicker } from 'antd'

import * as S from './styles'

import { capitalizeWords } from '@/utils/functions/capitalizeWords'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { CreateUserProps, createUser } from '@/services/user/create-user'

type CreateUserModalProps = {
  onUserCreateed: () => void
}

export default function CreateUserModal({
  onUserCreateed
}: CreateUserModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreateUserProps>({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      accessType: undefined,
      dateOfBirth: undefined
    },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<CreateUserProps> = async (data) => {
    setIsLoading(true)

    try {
      await createUser({
        ...data,
        dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD')
      })
      Notification({
        type: 'success',
        message: 'Usuário cadastrado',
        description: 'O usuário foi cadastrado com sucesso'
      })
      setIsLoading(false)
      reset()
      handleCancel()
      onUserCreateed()
    } catch (error: any) {
      setIsLoading(false)
      Notification({
        type: 'error',
        message: 'Erro ao cadastrar usuário',
        description: error.message || 'Ocorreu um erro ao cadastrar o usuário'
      })
    }
  }

  useEffect(() => {
    const name = watch('name')
    const lastName = watch('lastName')
    setValue('name', capitalizeWords(name))
    setValue('lastName', capitalizeWords(lastName))
  }, [watch('name'), watch('lastName')])

  const showModal = () => {
    reset()
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        icon={<PlusOutlined />}
        iconPosition="start"
        style={{ marginRight: 'auto' }}
      >
        Cadastrar
      </Button>
      <Modal
        title="Cadastrar usuário"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          style={{ width: '100%' }}
        >
          <Form.Item
            label="Nome"
            validateStatus={errors.name && 'error'}
            help={errors.name && errors.name.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Nome é obrigatório',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Nome pode conter apenas letras e espaços'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="John"
                  disabled={isLoading}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            validateStatus={errors.lastName && 'error'}
            help={errors.lastName && errors.lastName.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'Sobrenome é obrigatório',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Sobrenome pode conter apenas letras e espaços'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Doo"
                  disabled={isLoading}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="E-mail"
            validateStatus={errors.email && 'error'}
            help={errors.email && errors.email.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'E-mail inválido'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="jhon.doo@sonepar.com.br"
                  disabled={isLoading}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Tipo de acesso"
            validateStatus={errors.accessType && 'error'}
            help={errors.accessType && errors.accessType.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="accessType"
              control={control}
              rules={{ required: 'Tipo de acesso é obrigatório' }}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={isLoading}
                  placeholder="Selecione o tipo de acesso"
                  size="large"
                  options={[
                    { value: 'adm', label: 'Administrador' },
                    { value: 'usr', label: 'Usuário' },
                    { value: 'dev', label: 'Desenvolvedor' }
                  ]}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Data de nascimento"
            validateStatus={errors.dateOfBirth && 'error'}
            help={errors.dateOfBirth && errors.dateOfBirth.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: 'Data de nascimento é obrigatória' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  placeholder="Selecione a data de nascimento"
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                  onChange={(dateString) => {
                    field.onChange(dateString)
                  }}
                  value={field.value}
                  disabled={isLoading}
                />
              )}
            />
          </Form.Item>
          <Divider />
          <S.FormButtonWrapper>
            <Button
              type="default"
              danger
              htmlType="button"
              size="large"
              iconPosition="end"
              onClick={handleCancel}
            >
              Fechar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              iconPosition="end"
              disabled={Object.keys(errors).length > 0}
            >
              Cadastrar
            </Button>
          </S.FormButtonWrapper>
        </Form>
      </Modal>
    </>
  )
}
