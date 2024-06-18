import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCMS-Relatorios',
  description: 'Página de Relatorios do PCMS'
}

import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
