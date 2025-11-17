import React, { useEffect, useRef, useState } from 'react'
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
} from '@mui/material'

export default function RefComponent3() {
  // Multiple input refs
  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  // Table data state
  const [rows, setRows] = useState([])

  const handleSubmit = () => {
    const name = nameRef.current.value.trim()
    const email = emailRef.current.value.trim()
    const phone = phoneRef.current.value.trim()

    if (!name || !email || !phone) return alert('Please fill all fields')

    // Add new row
    setRows((prev) => [...prev, { id: Date.now(), name, email, phone }])

    // Clear inputs
    nameRef.current.value = ''
    emailRef.current.value = ''
    phoneRef.current.value = ''

    nameRef.current.focus() // focus back to first input
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, py: 4, background: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Register Form (useRef + MUI)
      </Typography>

      <TextField label="Name" inputRef={nameRef} fullWidth margin="normal" />

      <TextField label="Email" inputRef={emailRef} fullWidth margin="normal" />

      <TextField label="Phone" inputRef={phoneRef} fullWidth margin="normal" />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Add to Table
      </Button>

      {/* Table */}

      {rows.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
