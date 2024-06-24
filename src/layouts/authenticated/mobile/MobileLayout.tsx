'use client'

import Header from '@/app/components/Header/Header'
import { ReactNode } from 'react'
import * as S from './styles'

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <S.Wrapper>
      <Header />
      {children}
    </S.Wrapper>
  )
}
