import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import { Button, createTheme, CssBaseline, ThemeProvider } from '@u_ui/u-ui'

export default function Layout() {

  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
