import React from 'react'
import Hero from './Hero'
import QRCode from 'react-qr-code'
import { Container } from '@u_ui/u-ui'

export default function Home() {
    return (
        <div>
            <Hero />
            <Container
                sx={{
                    padding: '5rem',
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <QRCode value="https://freelibrary.vandlee.com/" />
            </Container>
        </div>
    )
}
