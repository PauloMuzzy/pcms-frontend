'use client'

import { Select } from 'antd'

import * as S from './styles'

const handleChangeField = (value: string) => {
  console.log(`selected ${value}`)
}

export default function PatientFilter() {
  return (
    <S.Wrapper>
      <Select
        style={{ width: '100%' }}
        onChange={(value) => console.log(value)}
        placeholder="Selecione o campo"
        options={[
          { value: 'name', label: 'name' },
          { value: 'email', label: 'e-mail' },
          { value: 'age', label: 'idade' }
        ]}
      />
    </S.Wrapper>
  )
}
