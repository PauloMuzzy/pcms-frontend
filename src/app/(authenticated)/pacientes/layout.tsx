import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCMS-Pacientes',
  description: 'Página de pacientes do PCMS'
}

import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
