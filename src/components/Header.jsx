import React from 'react'
import { BellIcon, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Header = ({ userName = "Jean", userRole= "Admin" }) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">VM Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:flex-col md:items-end">
              <div className="text-sm font-medium">Welcome, {userName}!</div>
              <div className="text-xs text-muted-foreground">{userRole}</div>
            </div>
            <Avatar>
              <AvatarImage src="/VM-LOGO-PS.png?height=50&width=50" />
              <AvatarFallback>VM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header