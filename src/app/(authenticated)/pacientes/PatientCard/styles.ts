import { Avatar as AvatarComponent, Divider as DividerComponent } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: fit-content;
  padding: 8px;
`

export const Card = styled.div`
  display: grid;
  grid-template-areas:
    'avatar divider name name'
    'avatar divider email email'
    'avatar divider phone phone'
    'avatar divider gender gender'
    'avatar divider active showMore';
  grid-template-columns: 54px 1px 2fr max-content;
  grid-column-gap: 16px;
  grid-row-gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: fit-content;
  transition: 0.3s;
  cursor: pointer;
`

export const Avatar = styled(AvatarComponent)`
  grid-area: avatar;
  width: 54px;
  height: 54px;
  background: linear-gradient(300deg, deepskyblue, darkviolet, blue);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
`

export const Divider = styled(DividerComponent)`
  grid-area: divider;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`

export const Name = styled.span`
  grid-area: name;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Email = styled.span`
  grid-area: email;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Phone = styled.span`
  grid-area: phone;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Gender = styled.span`
  grid-area: gender;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Active = styled.div`
  grid-area: active;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ShowMore = styled.span`
  grid-area: showMore;
  margin-left: auto;
`

export const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`
