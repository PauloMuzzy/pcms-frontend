import styled from 'styled-components'

export const Wrapper = styled.main`
  display: grid;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  grid-template-areas:
    'header header'
    'nav    section';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`

export const HeaderWrapper = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #7395ae;
`

export const NavigationWrapper = styled.nav`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: #001529;
`

export const SectionWrapper = styled.section`
  grid-area: section;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: center;
  background-color: #c0d6df;
  padding: 16px;
  gap: 16px;
  overflow-y: auto;
`

export const ChildrenWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  padding: 16px;
`

export const CreatedBy = styled.span`
  font-size: 0.8rem;
  color: #c0d6df;
  padding: 4px;
  margin-top: auto;
`
