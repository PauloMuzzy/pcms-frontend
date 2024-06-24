import { ComponentType, useEffect, useState } from 'react'

type ResizeHOCProps = {
  mobile?: ComponentType<any>
  tablet?: ComponentType<any>
  desktop?: ComponentType<any>
}

export default function ResizeHOC({
  mobile: MobileComponent,
  tablet: TabletComponent,
  desktop: DesktopComponent
}: ResizeHOCProps) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  )

  const updateDevice = () => {
    const width = window.innerWidth
    if (MobileComponent && TabletComponent && DesktopComponent) {
      if (width < 600) {
        setDevice('mobile')
      } else if (width >= 600 && width < 1024) {
        setDevice('tablet')
      } else {
        setDevice('desktop')
      }
    } else if (MobileComponent && TabletComponent) {
      if (width < 600) {
        setDevice('mobile')
      } else {
        setDevice('tablet')
      }
    } else if (MobileComponent && DesktopComponent) {
      if (width < 600) {
        setDevice('mobile')
      } else {
        setDevice('desktop')
      }
    }
  }

  useEffect(() => {
    updateDevice()
    window.addEventListener('resize', updateDevice)

    return () => {
      window.removeEventListener('resize', updateDevice)
    }
  }, [])

  if (device === 'mobile' && MobileComponent) {
    return <MobileComponent />
  }

  if (device === 'tablet' && TabletComponent) {
    return <TabletComponent />
  }

  if (device === 'desktop' && DesktopComponent) {
    return <DesktopComponent />
  }

  return null
}
