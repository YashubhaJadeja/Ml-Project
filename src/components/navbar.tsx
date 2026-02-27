'use client'

import React from 'react'
import { Heart, Menu, Bell, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">CardioML</h1>
          </div>
        </div>

        {/* Center Section - Empty or Status */}
        <div className="hidden md:block text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            API Status: <span className="text-green-600 font-semibold">🟢 Online</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
