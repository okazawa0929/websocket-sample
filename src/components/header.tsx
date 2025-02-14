'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/page-a', label: 'Page-A' },
  { href: '/page-b', label: 'Page-B' },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className='w-full border-b'>
      <div className='container flex h-16 items-center px-4'>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      'px-4 py-2 hover:bg-accent hover:text-accent-foreground relative',
                      pathname === item.href &&
                        'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary',
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
