import {
  FormDataProps,
  PatientRegistrationModalProps
} from '@/app/(authenticated)/pacientes/PatientRegistrationModal/types'
import { OptionResponseModel } from '@/model/option-model'
import { findOptionList } from '@/services/option-list/find-option-list'
import { createPatient } from '@/services/patient/create-patient'
import { capitalizeWords } from '@/utils/functions/capitalizeWords'
import { cpfMask } from '@/utils/masks/cpf-mask'
import { phoneMask } from '@/utils/masks/phone-mask'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PatientRegistrationModal({
  onFinishRegistration,
  openModal,
  setIsModalVisible
}: PatientRegistrationModalProps) {
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

  const {
    control,
    register,
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
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  useEffect(() => {
    getGenderList()
    getProfessionList()
    getEmergencyContactRelationshipsList()
    reset()
  }, [])

  const handleCancel = () => {
    reset()
    setIsModalVisible(false)
  }

  const onSubmit = async (data: FormDataProps) => {
    try {
      await createPatient({
        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
        phone: data.phone.replace(/\D/g, ''),
        emergencyContactPhone: data.emergencyContactPhone.replace(/\D/g, '')
      })
      onFinishRegistration()
      setOpen(false)
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

  return (
    <>
      <Modal
        title="Cadastrar novo paciente"
        open={open}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={[
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleCancel}
            danger
            key="cancel"
          >
            Cancelar
          </Button>,
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            key="submit"
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
              rules={{
                required: 'Nome é obrigatório.',
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Nome deve conter apenas letras.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o nome"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                    const capitalizedValue = capitalizeWords(value)
                    field.onChange(capitalizedValue)
                  }}
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
              rules={{
                required: 'Sobrenome é obrigatório.',
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Nome deve conter apenas letras.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o sobrenome"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                    const capitalizedValue = capitalizeWords(value)
                    field.onChange(capitalizedValue)
                  }}
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
              rules={{
                required: 'CPF é obrigatório.',
                minLength: {
                  value: 14,
                  message: 'CPF deve conter no mínimo 11 dígitos.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o CPF"
                  maxLength={14}
                  {...field}
                  onChange={(e) => {
                    field.onChange(cpfMask(e.target.value))
                  }}
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
              rules={{
                required: 'Telefone é obrigatório.',
                minLength: {
                  value: 15,
                  message: 'Telefone deve conter no mínimo 11 dígitos.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o Telefone"
                  maxLength={15}
                  {...field}
                  onChange={(e) => {
                    field.onChange(phoneMask(e.target.value))
                  }}
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
              rules={{
                required: 'Email é obrigatório.',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Email inválido.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o email"
                  {...field}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value.toLocaleLowerCase().replace(/ /g, '')
                    )
                  }}
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
                  disabledDate={(current) =>
                    current && current > moment().endOf('day')
                  }
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
                  options={[
                    { label: '- Selecione a profissão - ', value: '' },
                    ...professionOptions
                  ]}
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
                  placeholder="Selecione o gênero"
                  {...field}
                  loading={genderOptionsIsLoading}
                  options={[
                    { label: '- Selecione o gênero - ', value: '' },
                    ...genderOptions
                  ]}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Nome do contato de emergência"
            validateStatus={errors.emergencyContactName && 'error'}
            help={errors.emergencyContactName?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactName"
              control={control}
              rules={{
                required: 'Nome do contato de emergência é obrigatório.'
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o nome"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                    const capitalizedValue = capitalizeWords(value)
                    field.onChange(capitalizedValue)
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Telefone do contato de emergência"
            validateStatus={errors.emergencyContactPhone && 'error'}
            help={errors.emergencyContactPhone?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactPhone"
              control={control}
              rules={{
                required: 'Telefone do contato de emergência é obrigatório.',
                minLength: {
                  value: 15,
                  message:
                    'Telefone do contato de emergência deve conter no mínimo 11 números.'
                }
              }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Digite o Telefone"
                  maxLength={15}
                  {...field}
                  onChange={(e) => {
                    field.onChange(phoneMask(e.target.value))
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Parentesco do contato de emergência"
            validateStatus={errors.emergencyContactRelationship && 'error'}
            help={errors.emergencyContactRelationship?.message?.toString()}
            required
          >
            <Controller
              name="emergencyContactRelationship"
              control={control}
              rules={{
                required: 'Parentesco do contato de emergência é obrigatório.'
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  loading={emergencyContactRelationshipsOptionsIsLoading}
                  options={[
                    { label: '- Selecione o parentesco - ', value: '' },
                    ...emergencyContactRelationshipsOptions
                  ]}
                />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
