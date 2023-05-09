import { useEffect } from 'react'
import Header from 'src/components/Header'
import Navbar from 'src/components/Navbar'
import { useActivePath } from 'src/contexts/activeLink'
import { Card } from '@mui/material'

const About = () => {
  const { setActivePath } = useActivePath()

  useEffect(() => {
    setActivePath('About')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Navbar />

      <div style={{ marginTop: '5%' }}>
        <Card sx={{margin: '50px', padding: '50px', height: '80vh'}}>hello</Card>
      </div>
    </>
  )
}

export default About
