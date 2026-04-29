'use client'

import React from 'react'

import { SessionProvider } from 'next-auth/react'

import QueryProvider from '@/provider/query-provider'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  )
}

export default AdminLayout
