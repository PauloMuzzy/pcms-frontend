import { ControlOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu as MenuComponent } from 'antd'
import { useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <ControlOutlined />,
    label: 'Administração',
    children: [
      { key: '11', label: 'Usuários' },
      { key: '12', label: 'Option 2' }
    ]
  },
  {
    key: '2',
    icon: <ControlOutlined />,
    label: 'Produtos',
    children: [{ key: '21', label: 'Option 1' }]
  }
]

interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {}
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}

const levelKeys = getLevelKeys(items as LevelKeysProps[])

export default function Menu() {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23'])

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    )
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      )
    } else {
      setStateOpenKeys(openKeys)
    }
  }

  return (
    <MenuComponent
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
      theme="dark"
    />
  )
}
