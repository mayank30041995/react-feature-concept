import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material'

export default function Home() {
  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        🏠 Welcome to the Home Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This is the starting point of our beautiful MUI-powered app.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Get Started
        </Button>
        <Button variant="outlined" color="secondary">
          Learn More
        </Button>
      </Box>
    </Container>
  )
}
