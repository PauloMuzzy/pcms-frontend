'use client'
import * as S from './styles'

export default function Breadcrumb() {
  return (
    <S.Breadcrumb
      items={[
        {
          title: 'Administração'
        },
        {
          title: 'Usuários'
        }
      ]}
    />
  )
}
