'use client'

import ResizeHOC from '@/app/components/resizeHOC/ResizeHOC'
import DesktopLayout from '@/layouts/authenticated/desktop/DesktopLayout'
import MobileLayout from '@/layouts/authenticated/mobile/MobileLayout'
import TabletLayout from '@/layouts/authenticated/tablet/TabletLayout'
import { ReactNode } from 'react'

export default function AuthenticatedLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <ResizeHOC
      mobile={() => <MobileLayout children={children} />}
      tablet={() => <TabletLayout />}
      desktop={() => <DesktopLayout children={children} />}
    />
  )
}
