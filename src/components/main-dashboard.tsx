'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import Overview from '@/components/pages/overview'
import PredictionForm from '@/components/pages/prediction-form'
import Analytics from '@/components/pages/analytics'

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'predict':
        return <PredictionForm />
      case 'analytics':
        return <Analytics />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}
