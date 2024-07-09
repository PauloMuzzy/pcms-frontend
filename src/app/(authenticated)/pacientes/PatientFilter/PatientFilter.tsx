import { FormDataProps } from '@/app/(authenticated)/pacientes/PatientFilter/types'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select, Switch } from 'antd'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const conditionOptions = {
  name: [
    { value: 'contains', label: 'Contém' },
    { value: 'startsWith', label: 'Começa com' },
    { value: 'endsWith', label: 'Termina com' }
  ],
  email: [
    { value: 'contains', label: 'Contém' },
    { value: 'startsWith', label: 'Começa com' },
    { value: 'endsWith', label: 'Termina com' }
  ],
  age: [
    { value: 'equal', label: 'Igual a' },
    { value: 'greaterThan', label: 'Maior que' },
    { value: 'greaterThanOrEqual', label: 'Maior ou igual a' },
    { value: 'lessThan', label: 'Menor que' },
    { value: 'lessThanOrEqual', label: 'Menor ou igual a' },
    { value: 'between', label: 'Entre' }
  ],
  registerDate: [
    { value: 'equal', label: 'Igual a' },
    { value: 'notEqual', label: 'Diferente de' },
    { value: 'greaterThan', label: 'Maior que' },
    { value: 'greaterThanOrEqual', label: 'Maior ou igual a' },
    { value: 'lessThan', label: 'Menor que' },
    { value: 'lessThanOrEqual', label: 'Menor ou igual a' },
    { value: 'between', label: 'Entre' }
  ]
}

export default function PatientFilter() {
  const [selectedField, setSelectedField] = useState()
  const [selectedCondition, setSelectedCondition] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    defaultValues: {
      field: '',
      condition: '',
      value: '',
      startValue: '',
      endValue: '',
      date: null,
      startDate: null,
      endDate: null,
      isActive: true
    },
    mode: 'onBlur'
  })

  const handleFieldChange = (value: any) => {
    setSelectedField(value)
    setSelectedCondition('')
  }

  const handleConditionChange = (value: any) => {
    setSelectedCondition(value)
  }

  const renderInputFields = () => {
    if (selectedField === 'registerDate') {
      if (selectedCondition === 'between') {
        return (
          <>
            <Form.Item
              label="Data inicial"
              validateStatus={errors.startDate && 'error'}
              help={errors.startDate?.message?.toString()}
              required
            >
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Data inicial é obrigatória.' }}
                render={({ field }) => (
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Data final"
              validateStatus={errors.endDate && 'error'}
              help={errors.endDate?.message?.toString()}
              required
            >
              <Controller
                name="endDate"
                control={control}
                rules={{ required: 'Data final é obrigatória.' }}
                render={({ field }) => (
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </Form.Item>
          </>
        )
      }
      return (
        <Form.Item
          label="Data"
          validateStatus={errors.date && 'error'}
          help={errors.date?.message?.toString()}
          required
        >
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Data é obrigatória.' }}
            render={({ field }) => (
              <DatePicker
                style={{ width: '100%' }}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </Form.Item>
      )
    }

    if (selectedCondition === 'between') {
      return (
        <>
          <Form.Item
            label="Valor inicial"
            validateStatus={errors.startValue && 'error'}
            help={errors.startValue?.message?.toString()}
            required
          >
            <Controller
              name="startValue"
              control={control}
              rules={{ required: 'Valor inicial é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Insira o valor inicial"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Valor final"
            validateStatus={errors.endValue && 'error'}
            help={errors.endValue?.message?.toString()}
            required
          >
            <Controller
              name="endValue"
              control={control}
              rules={{ required: 'Valor final é obrigatório.' }}
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  placeholder="Insira o valor final"
                  {...field}
                />
              )}
            />
          </Form.Item>
        </>
      )
    }

    if (selectedCondition) {
      return (
        <Form.Item
          label="Valor"
          validateStatus={errors.value && 'error'}
          help={errors.value?.message?.toString()}
          required
        >
          <Controller
            name="value"
            control={control}
            rules={{ required: 'Valor é obrigatório.' }}
            render={({ field }) => (
              <Input
                style={{ width: '100%' }}
                placeholder="Insira o valor"
                {...field}
              />
            )}
          />
        </Form.Item>
      )
    }

    return null
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Campo"
        validateStatus={errors.field && 'error'}
        help={errors.field?.message?.toString()}
        hasFeedback
        required
        style={{ width: '100%' }}
      >
        <Controller
          name="field"
          control={control}
          rules={{ required: 'O campo é obrigatório.' }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                field.onChange(value)
                handleFieldChange(value)
              }}
              placeholder="Selecione o campo"
              options={[
                { value: 'name', label: 'Nome' },
                { value: 'email', label: 'E-mail' },
                { value: 'age', label: 'Idade' },
                { value: 'registerDate', label: 'Data de cadastro' }
              ]}
            />
          )}
        />
      </Form.Item>

      {selectedField && (
        <Form.Item
          label="Condição"
          validateStatus={errors.condition && 'error'}
          help={errors.condition?.message?.toString()}
          hasFeedback
          required
          style={{ width: '100%' }}
        >
          <Controller
            name="condition"
            control={control}
            rules={{ required: 'A condição é obrigatória.' }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(value) => {
                  field.onChange(value)
                  handleConditionChange(value)
                }}
                placeholder="Selecione a condição"
                options={conditionOptions[selectedField]}
              />
            )}
          />
        </Form.Item>
      )}

      {renderInputFields()}

      <Form.Item>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              defaultChecked
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
        <span> Exibir apenas pacientes ativos</span>
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Aplicar filtro
        </Button>
      </Form.Item>
    </Form>
  )
}
