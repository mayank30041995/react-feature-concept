import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

export default function About() {
  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ℹ️ About Us
        </Typography>
        <Typography variant="body1">
          We are building a scalable React app with Material-UI and route-based
          code splitting. This ensures better performance and user experience.
        </Typography>
      </Paper>
    </Container>
  )
}
