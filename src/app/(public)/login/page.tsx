'use client'

import Notification from '@/app/components/Notification/Notification'
import { Button, Divider, Form, Input } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { login } from '@/services/auth/login-service'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as S from './styles'

type LoginProps = {
  email: string
  password: string
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<LoginProps>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    setIsLoading(true)
    try {
      await login(data)
      Notification({
        type: 'success',
        message: 'Login realizado com sucesso',
        description: 'Você será redirecionado para a página inicial'
      })
      setIsLoading(false)
      router.push('/usuarios')
      reset()
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError('email', {
            type: 'manual',
            message: error.response?.data.message
          })
          setError('password', {
            type: 'manual',
            message: error.response?.data.message
          })
        } else {
          Notification({
            type: 'error',
            message: 'Erro ao realizar login',
            description: 'Houve um erro inesperado, tente novamente mais tarde.'
          })
        }
      }
    }
  }

  return (
    <S.Wrapper>
      <h1>Login - PCMS</h1>
      <S.FormWrapper>
        <Divider />
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          style={{ width: '100%' }}
        >
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
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Digite um e-mail válido'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="john.doo@example.com.br"
                  disabled={isLoading}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            validateStatus={errors.password && 'error'}
            help={errors.password && errors.password.message}
            hasFeedback
            required
            style={{ width: '100%' }}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="* * * * * *"
                  disabled={isLoading}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Divider />
          <S.FormButtonWrapper>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              iconPosition="end"
              disabled={Object.keys(errors).length > 0}
              block
            >
              Entrar
            </Button>
          </S.FormButtonWrapper>
        </Form>
      </S.FormWrapper>
    </S.Wrapper>
  )
}
