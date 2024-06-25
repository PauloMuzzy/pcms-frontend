'use client'

import { PatientCardProps } from '@/app/(authenticated)/pacientes/PatientCard/types'
import { calculateAge } from '@/utils/functions/calculateAge'
import { Button } from 'antd'
import * as S from './styles'

export default function PatientCard({
  id,
  name,
  lastName,
  email,
  dateOfBirth,
  gender,
  active
}: PatientCardProps) {
  return (
    <S.Card>
      <S.Avatar>
        {name[0]}
        {lastName[0]}
      </S.Avatar>
      <S.Divider type="vertical" />
      <S.Name>
        Nome:{' '}
        <S.Text>
          {name} {lastName}
        </S.Text>
      </S.Name>
      <S.Email>
        E-mail: <S.Text>{email}</S.Text>
      </S.Email>
      <S.Phone>
        Idade: <S.Text>{calculateAge(dateOfBirth)} anos</S.Text>
      </S.Phone>
      <S.Gender>
        Gênero: <S.Text>{gender}</S.Text>
      </S.Gender>
      <S.Active>
        {active ? (
          <Button type="primary" color="green" ghost>
            ativo
          </Button>
        ) : (
          <Button type="primary" danger ghost>
            inativo
          </Button>
        )}
      </S.Active>
      <S.ShowMore>
        <Button onClick={() => console.log(id)} type="link">
          Ver mais
        </Button>
      </S.ShowMore>
    </S.Card>
  )
}
