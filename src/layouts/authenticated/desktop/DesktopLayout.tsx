'use client'
import Header from '@/app/components/Header/Header'
import Menu from '@/app/components/Menu/Menu'
import ShearchMenu from '@/app/components/Menu/ShearchMenu/ShearchMenu'
import { ReactNode } from 'react'
import * as S from './styles'

export default function DesktopLayout({ children }: { children: ReactNode }) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <Header />
      </S.HeaderWrapper>
      <S.NavigationWrapper>
        <ShearchMenu />
        <Menu />
        <S.CreatedBy>Created by PauloMuzzy@2024</S.CreatedBy>
      </S.NavigationWrapper>
      <S.SectionWrapper>
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      </S.SectionWrapper>
    </S.Wrapper>
  )
}
