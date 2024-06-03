'use client'

import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import Header from '@/app/components/Header/Header'
import Menu from '@/app/components/Menu/Menu'
import ShearchMenu from '@/app/components/Menu/ShearchMenu/ShearchMenu'
import { ReactNode } from 'react'
import * as S from './styles'

export default function AuthenticatedLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      <S.NavigationWrapper>
        <ShearchMenu />
        <Menu />
        <S.CreatedBy>Created by Sonepar@2024</S.CreatedBy>
      </S.NavigationWrapper>
      <S.SectionWrapper>
        <Breadcrumb />
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      </S.SectionWrapper>
    </S.Wrapper>
  )
}
