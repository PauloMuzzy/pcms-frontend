import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar as AvatarUser, Button, Dropdown } from 'antd'

export default function Avatar() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" style={{ width: '100%', textAlign: 'start' }}>
          Minha conta
        </Button>
      )
    },
    {
      key: '2',
      label: (
        <Button type="link" style={{ width: '100%', textAlign: 'start' }}>
          Configurações
        </Button>
      )
    },
    {
      key: '3',
      label: (
        <Button type="primary" danger style={{ width: '100%' }}>
          sair
        </Button>
      )
    }
  ]

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <AvatarUser
        style={{ cursor: 'pointer' }}
        size={64}
        icon={<UserOutlined />}
      ></AvatarUser>
    </Dropdown>
  )
}
