import React, { useState } from 'react'
import './App.css'
import SimplePaper from './components/SimplePaper'
import FormFirstStep from './components/FormFirstStep'
import { useLocation, useNavigate } from 'react-router-dom'
import RadioBtns from './components/RadioBtns'
import DateRanges from './components/DateRanges'
import axios from 'axios'
import { socketURL } from './functions/url'
import RefComponent from './components/RefComponent'
import InfiniteList from './components/InfiniteList'
import Dashboard from './components/Dashboard'
import RefComponent2 from './components/RefComponent2'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const [form, setForm] = useState({})
  const [wheel, setWheel] = useState()

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false)
      setForm(values)
      navigate('/step2')
    }, 500)
  }
  const onSubmitForm2 = (values) => {
    setWheel(values)
    navigate('/step3')
  }

  const onSubmitForm3 = (dateRange) => {
    const url = `${socketURL()}/user`
    if (wheel && form) {
      const { firstName, lastName } = form
      console.log('Submit Booking', dateRange, wheel, firstName, lastName)

      axios
        .post(url, {
          firstName: firstName,
          lastName: lastName,
          wheelId: wheel,
        })
        .then((res) => {})
        .catch((err) => {
          console.error(err.message)
        })
    }
  }

  function renderSwitch(param) {
    switch (param) {
      case '/':
        return <FormFirstStep {...{ form, onSubmit }} />
      case '/step2':
        return <RadioBtns {...{ wheelId: wheel, onSubmitForm2 }} />
      case '/step3':
        return <DateRanges {...{ onSubmitForm3 }} />
      default:
        return <FormFirstStep {...{ form, onSubmit }} />
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <SimplePaper>{renderSwitch(pathname)}</SimplePaper>
        {/* <RefComponent /> */}
        <RefComponent2 />
        {/* <InfiniteList /> */}
        {/* <Dashboard /> */}
      </header>
    </div>
  )
}

export default App
