'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from 'next/link'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SideBarOptions } from "@/services/Constants"
import { usePathname } from "next/navigation"
export function AppSidebar() {
  const path=usePathname();
  return (
    <Sidebar>
      <SidebarHeader className='flex flex-col items-center'>
        <Image src="/logo.png" alt="logo" width={150} height={20} />
        <Button className='w-full mt-5'>
          <Plus className="mr-2" />
          Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className='p-1'>
                  <SidebarMenuButton asChild className={`p-5 ${path==option.path && 'bg-blue-50' }`}>
                    <Link href={option.path}>
                      <option.icon className={`${path==option.path && 'text-primary'}`} />
                      <span className={`text-[16px] font-medium ${path==option.path && 'text-primary'}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}