import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import  {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  // const status = useSelector((state) => state.auth.status)

  useEffect(()=>{
    // if(status){
      authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))        
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
    // }
    // setLoading(false)
  },[])
  
    

  return loading ? null : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
