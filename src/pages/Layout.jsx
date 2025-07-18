import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@u_ui/u-ui'

export default function Layout() {

  return (
    <div>
        <Header />
        <Box sx={{ height: 80}} />
        <Outlet />
    </div>
  )
}
