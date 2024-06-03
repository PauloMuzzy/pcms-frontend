'use client'

import { ReactNode } from 'react'
import * as S from './styles'

export default function AuthenticatedLayout({
  children
}: {
  children: ReactNode
}) {
  return <S.Wrapper>{children}</S.Wrapper>
}
