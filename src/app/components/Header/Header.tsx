import Avatar from '@/app/components/Header/Avatar/Avatar'
import DrawerMenu from '@/app/components/Header/DrawerMenu/DrawerMenu'
import ResizeHOC from '@/app/components/resizeHOC/ResizeHOC'
import * as S from './styles'

export default function Header() {
  return (
    <ResizeHOC
      mobile={() => (
        <S.Wrapper>
          <DrawerMenu />
        </S.Wrapper>
      )}
      tablet={() => <S.Wrapper>Tablet</S.Wrapper>}
      desktop={() => (
        <S.Wrapper>
          <h1>PCMS</h1>
          <Avatar />
        </S.Wrapper>
      )}
    />
  )
}
