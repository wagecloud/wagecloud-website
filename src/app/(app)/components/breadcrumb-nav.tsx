'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

const navMap: Record<string, string> = {
  dashboard: 'Dashboard',
  create: 'Create Instance',
  settings: 'Settings',
  help: 'Help & Support',
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const currentNavItems = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      const title = segment.charAt(0).toUpperCase() + segment.slice(1)
      return {
        title: navMap[segment] || title,
        url: `/${segment}`,
      }
    })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {currentNavItems.map((item, index) => (
          <BreadcrumbItem key={item.title}>
            <>
              <BreadcrumbLink href={item.url}>
                {item.title}
              </BreadcrumbLink>
              {index < currentNavItems.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
