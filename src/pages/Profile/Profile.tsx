'use client'

import { useState } from 'react'
import UserProfileSidebar from './user-profile-sidebar'
import ProfileContent from './profile-content'
import Constributions from './contributions'


export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('profile')

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return <ProfileContent />
      case 'contributions':
        return <Constributions />
      default:
        return <ProfileContent />
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <UserProfileSidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}