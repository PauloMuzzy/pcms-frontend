import { FormDataProps } from '@/app/(authenticated)/pacientes/PatientRegistrationModal/types'
import { OptionResponseModel } from '@/model/option-model'
import { findOptionList } from '@/services/option-list/find-option-list'
import { createPatient } from '@/services/patient/create-patient'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PatientRegistrationModal() {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [genderOptionsIsLoading, setGenderOptionsIsLoading] = useState(true)
  const [professionOptionsIsLoading, setProfessionOptionsIsLoading] =
    useState(true)
  const [
    emergencyContactRelationshipsOptionsIsLoading,
    setEmergencyContactRelationshipsOptionsIsLoading
  ] = useState(true)
  const [genderOptions, setGenderOptions] = useState<
    OptionResponseModel[] | []
  >([])
  const [professionOptions, setProfessionOptions] = useState<
    OptionResponseModel[] | []
  >([])
  const [
    emergencyContactRelationshipsOptions,
    setEmergencyContactRelationshipsOptions
  ] = useState<OptionResponseModel[] | []>([])

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      reset()
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      lastName: '',
      cpf: '',
      email: '',
      dateOfBirth: '',
      phone: '',
      profession: '',
      gender: '',
      registerDate: '',
      emergencyContactName: '',
      emergencyContactRelationship: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: FormDataProps) => {
    try {
      await createPatient(data)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function getGenderList() {
    try {
      setGenderOptionsIsLoading(true)
      const response = await findOptionList('gender')
      setGenderOptions(response)
      setGenderOptionsIsLoading(false)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function getProfessionList() {
    try {
      setProfessionOptionsIsLoading(true)
      const response = await findOptionList('profession')
      setProfessionOptions(response)
      setProfessionOptionsIsLoading(false)
    } catch (error: any) {
      console.log(error)
    }
  }

  async function getEmergencyContactRelationshipsList() {
    try {
      setEmergencyContactRelationshipsOptionsIsLoading(true)
      const response = await findOptionList('emergencyContactRelationship')
      setEmergencyContactRelationshipsOptions(response)
      setEmergencyContactRelationshipsOptionsIsLoading(false)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGenderList()
    getProfessionList()
    getEmergencyContactRelationshipsList()
    reset()
  }, [])

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ width: '100%' }}
        size="large"
      >
        Novo paciente
      </Button>
      <Modal
        title="Cadastrar novo paciente"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={[
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleCancel}
            danger
            key={1}
          >
            Cancelar
          </Button>,
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            key={2}
          >
            Cadastrar
          </Button>
        ]}
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Nome"
            validateStatus={errors.name && 'error'}
            help={errors.name?.message?.toString()}
            required
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o nome"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            validateStatus={errors.lastName && 'error'}
            help={errors.lastName?.message?.toString()}
            required
          >
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Sobrenome é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o sobrenome"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="CPF"
            validateStatus={errors.cpf && 'error'}
            help={errors.cpf?.message?.toString()}
            required
          >
            <Controller
              name="cpf"
              control={control}
              rules={{ required: 'CPF é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o CPF"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Telefone"
            validateStatus={errors.phone && 'error'}
            help={errors.phone?.message?.toString()}
            required
          >
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Telefone é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o Telefone"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            validateStatus={errors.email && 'error'}
            help={errors.email?.message?.toString()}
            required
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o email"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Data de Nascimento"
            validateStatus={errors.dateOfBirth && 'error'}
            help={errors.dateOfBirth?.message?.toString()}
            required
          >
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: 'Data de Nascimento é obrigatória.' }}
              render={({ field }) => (
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Selecione a data"
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Profissão"
            validateStatus={errors.profession && 'error'}
            help={errors.profession?.message?.toString()}
            required
          >
            <Controller
              name="profession"
              control={control}
              rules={{ required: 'Profissão é obrigatória.' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecione a profissão"
                  loading={professionOptionsIsLoading}
                  options={professionOptions}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Gênero"
            validateStatus={errors.gender && 'error'}
            help={errors.gender?.message?.toString()}
            required
          >
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Gênero é obrigatório.' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecione o gênero"
                  loading={genderOptionsIsLoading}
                  options={genderOptions}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Nome do Contato de Emergência"
            validateStatus={errors.emergencyContactName && 'error'}
            help={errors.emergencyContactName?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactName"
              control={control}
              rules={{
                required: 'Nome do Contato de Emergência é obrigatório.'
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o nome do contato de emergência"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Telefone do Contato de Emergência"
            validateStatus={errors.emergencyContactPhone && 'error'}
            help={errors.emergencyContactPhone?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactPhone"
              control={control}
              rules={{
                required: 'Telefone do Contato de Emergência é obrigatório.'
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o telefone do contato de emergência"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Parentesco do Contato de Emergência"
            validateStatus={errors.emergencyContactRelationship && 'error'}
            help={errors.emergencyContactRelationship?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactRelationship"
              control={control}
              rules={{
                required: 'Parentesco do Contato de Emergência é obrigatório.'
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  loading={emergencyContactRelationshipsOptionsIsLoading}
                  options={emergencyContactRelationshipsOptions}
                  defaultActiveFirstOption
                />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
