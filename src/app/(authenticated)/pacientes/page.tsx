'use client'

import PatientCard from '@/app/(authenticated)/pacientes/PatientCard/PatientCard'
import {
  FindAllPatientsResponseProps,
  findAllPatients
} from '@/services/patient/find-all-patients'

import { Collapse, Pagination } from 'antd'
import { useState } from 'react'

import { FilterOutlined } from '@ant-design/icons'

import PatientRegistrationModal from '@/app/(authenticated)/pacientes/PatientRegistrationModal/PatientRegistrationModal'
import { useEffect } from 'react'
import * as S from './styles'

export default function Page() {
  const [patients, setPatients] = useState<FindAllPatientsResponseProps[]>([])
  const [filter, setFilter] = useState<string>('' as string)

  const findPatients = async () => {
    const response = await findAllPatients()
    setPatients(response)
  }

  useEffect(() => {
    findPatients()
  }, [])

  function RenderFitler() {
    return 'filter'
  }

  return (
    <S.Wrapper>
      <S.PatientRegistrationWrapper>
        <PatientRegistrationModal />
      </S.PatientRegistrationWrapper>
      <S.FilterWrapper>
        <Collapse
          expandIconPosition="end"
          items={[
            {
              key: '1',
              label: 'Filtros',
              children: RenderFitler(),
              extra: <FilterOutlined />
            }
          ]}
        />
      </S.FilterWrapper>
      <S.List>
        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            id={patient.id}
            name={patient.name}
            lastName={patient.lastName}
            email={patient.email}
            dateOfBirth={patient.dateOfBirth}
            active={patient.active}
            gender={patient.gender}
          />
        ))}
      </S.List>
      <S.PaginationWrapper>
        <Pagination showSizeChanger={false} total={30} defaultPageSize={2} />
      </S.PaginationWrapper>
    </S.Wrapper>
  )
}
