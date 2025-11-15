import React from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material'

export default function ContactUs() {
  return (
    <Container sx={{ mt: 5, maxWidth: 'sm' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          📞 Contact Us
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField label="Your Name" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" type="email" fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
