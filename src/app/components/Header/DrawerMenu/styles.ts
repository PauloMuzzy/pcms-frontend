import { Avatar as AvatarComponent, Button as ButtonComponent } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 16px;
`

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  gap: 8px;
  background-color: #7395ae;
`

export const Avatar = styled(AvatarComponent)`
  margin: 16px;
`

export const Button = styled(ButtonComponent)`
  background-color: #567082;
  color: #fff;
  border: none;
`
