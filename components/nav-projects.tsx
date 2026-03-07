"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, MoreHorizontalIcon, MessageSquareIcon, Trash2Icon, PlusIcon, FolderIcon, PencilIcon } from "lucide-react"
import { CHAT_SECTION } from "@/constants/chat.constants"
import Link from "next/link"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
    threads?: { title: string; url: string }[]
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Asistente AI</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            tooltip={CHAT_SECTION.newChat}
            asChild
          >
            <Link href="/dashboard/recents">
              <PlusIcon className="text-sidebar-foreground/70" />
              <span>{CHAT_SECTION.newChat}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            tooltip={CHAT_SECTION.addProject}
            asChild
          >
            <Link href="/dashboard/proyecto">
              <FolderIcon className="text-sidebar-foreground/70" />
              <span>{CHAT_SECTION.addProject}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {projects.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.name}>
                  {item.icon}
                  <span>{item.name}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  >
                    <MoreHorizontalIcon />
                    <span className="sr-only">Más opciones</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem asChild>
                    <Link href={item.url}>
                      <MessageSquareIcon className="text-muted-foreground" />
                      <span>Abrir proyecto</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PencilIcon className="text-muted-foreground" />
                    <span>Editar proyecto</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2Icon className="text-muted-foreground" />
                    <span>Eliminar proyecto</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.threads?.map((thread) => (
                    <SidebarMenuSubItem key={thread.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={thread.url}>
                          <span>{thread.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                  {(!item.threads || item.threads.length === 0) && (
                    <SidebarMenuSubItem>
                      <span className="text-sidebar-foreground/60 text-sm px-2 py-1">
                        Sin hilos
                      </span>
                    </SidebarMenuSubItem>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
