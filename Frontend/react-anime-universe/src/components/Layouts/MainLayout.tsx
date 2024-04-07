import './main-layout.scss'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'


function MainLayout() {
  return (
    <>
      <section className='main-layout'>
        <NavBar />

        <Outlet />

        <Footer />
      </section>
    </>
  )
}

export default MainLayout